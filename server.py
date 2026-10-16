#!/usr/bin/env python3
"""
JAMO Textile Corporate Website - Full Stack Dev & API Server
Serves static assets and provides REST API endpoints for products, news, company data, and contact inquiries.
No external dependencies required (Pure Python standard library).
"""

import sys
import os
import json
import mimetypes
import threading
import urllib.request
import urllib.error
from datetime import datetime
from http.server import ThreadingHTTPServer, SimpleHTTPRequestHandler
from urllib.parse import urlparse, parse_qs

# Load KEY=VALUE pairs from a local .env file (not committed) into the environment
_env_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), '.env')
if os.path.exists(_env_path):
    with open(_env_path, encoding='utf-8') as _f:
        for _line in _f:
            _line = _line.strip()
            if _line and not _line.startswith('#') and '=' in _line:
                _key, _value = _line.split('=', 1)
                os.environ.setdefault(_key.strip(), _value.strip().strip('"\''))

# Telegram Bot Configuration for Instant Inquiry Webhooks
TELEGRAM_BOT_TOKEN = os.getenv("TELEGRAM_BOT_TOKEN", "")
TELEGRAM_CHAT_ID = os.getenv("TELEGRAM_CHAT_ID", "")

def send_telegram_notification(inquiry):
    """Sends automated Telegram notification to admin when inquiry/quote is requested."""
    if not TELEGRAM_BOT_TOKEN or not TELEGRAM_CHAT_ID:
        print("  [TELEGRAM BOT] ⚠️ TELEGRAM_BOT_TOKEN / TELEGRAM_CHAT_ID o'rnatilmagan (.env faylini tekshiring)")
        return False

    name = inquiry.get('name', 'Noma\'lum')
    phone = inquiry.get('phone', 'Ko\'rsatilmagan')
    product = inquiry.get('product', 'Ko\'rsatilmagan')
    quantity = inquiry.get('quantity', 'Ko\'rsatilmagan')
    message = inquiry.get('message', 'Izoh yo\'q')
    time_str = inquiry.get('received_at', '')
    
    # Clean phone for direct Telegram chat link
    clean_phone = ''.join(c for c in phone if c.isdigit())
    tg_link = f"https://t.me/+{clean_phone}" if clean_phone else "https://t.me"

    text = (
        "🔔 <b>YANGI BUYURTMA SO'ROVI</b>\n"
        "\n"
        f"👤 <b>Mijoz:</b> {name}\n"
        f"📞 <b>Telefon:</b> <code>{phone}</code>\n"
        f"👕 <b>Mahsulot:</b> {product}\n"
        f"📦 <b>Miqdori:</b> {quantity} dona\n"
        f"💬 <b>Xabar:</b> {message}\n"
    )

    url = f"https://api.telegram.org/bot{TELEGRAM_BOT_TOKEN}/sendMessage"
    payload = {
        "chat_id": TELEGRAM_CHAT_ID,
        "text": text,
        "parse_mode": "HTML",
        "disable_web_page_preview": True
    }

    def _worker():
        try:
            req = urllib.request.Request(
                url,
                data=json.dumps(payload).encode('utf-8'),
                headers={'Content-Type': 'application/json'}
            )
            with urllib.request.urlopen(req, timeout=10) as resp:
                print(f"  [TELEGRAM BOT] 🚀 Xabarnoma yuborildi: chat_id={TELEGRAM_CHAT_ID}")
        except urllib.error.HTTPError as e:
            print(f"  [TELEGRAM BOT] ⚠️ Xabarnoma yuborishda xatolik: {e} {e.read().decode('utf-8', 'replace')}")
        except Exception as e:
            print(f"  [TELEGRAM BOT] ⚠️ Xabarnoma yuborishda xatolik: {e}")

    # Send in background thread to prevent blocking client response
    threading.Thread(target=_worker, daemon=True).start()
    return True


# Ensure utf-8 encoding for console output on Windows
if sys.platform == 'win32':
    try:
        sys.stdout.reconfigure(encoding='utf-8')
        sys.stderr.reconfigure(encoding='utf-8')
    except Exception:
        pass

# Set directory to project root
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
os.chdir(BASE_DIR)

# Ensure data directory and inquiries file exist
DATA_DIR = os.path.join(BASE_DIR, 'data')
os.makedirs(DATA_DIR, exist_ok=True)
INQUIRIES_FILE = os.path.join(DATA_DIR, 'inquiries.json')
if not os.path.exists(INQUIRIES_FILE):
    with open(INQUIRIES_FILE, 'w', encoding='utf-8') as f:
        json.dump([], f, indent=2)

class JamoRequestHandler(SimpleHTTPRequestHandler):
    def send_cors_headers(self):
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')

    def end_headers(self):
        self.send_header('Cache-Control', 'no-cache, no-store, must-revalidate')
        self.send_header('Pragma', 'no-cache')
        self.send_header('Expires', '0')
        super().end_headers()

    def do_OPTIONS(self):
        self.send_response(204)
        self.send_cors_headers()
        self.end_headers()

    def do_GET(self):
        parsed = urlparse(self.path)
        path = parsed.path

        # REST API endpoints
        if path == '/api/products':
            self.serve_json_file(os.path.join(DATA_DIR, 'products.json'))
            return
        elif path == '/api/news':
            self.serve_json_file(os.path.join(DATA_DIR, 'news.json'))
            return
        elif path == '/api/company':
            self.serve_json_file(os.path.join(DATA_DIR, 'company.json'))
            return
        elif path == '/api/inquiries':
            self.serve_json_file(INQUIRIES_FILE)
            return

        # Serve static files
        super().do_GET()

    def do_POST(self):
        parsed = urlparse(self.path)
        path = parsed.path

        if path == '/api/contact':
            content_length = int(self.headers.get('Content-Length', 0))
            post_data = self.rfile.read(content_length).decode('utf-8')
            try:
                data = json.loads(post_data)
            except Exception as e:
                self.send_response(400)
                self.send_cors_headers()
                self.send_header('Content-Type', 'application/json')
                self.end_headers()
                self.wfile.write(json.dumps({'error': 'Invalid JSON'}).encode('utf-8'))
                return

            # Append to inquiries.json
            try:
                with open(INQUIRIES_FILE, 'r', encoding='utf-8') as f:
                    inquiries = json.load(f)
            except Exception:
                inquiries = []

            inquiry_record = {
                'id': len(inquiries) + 1,
                'name': data.get('name', 'Noma\'lum'),
                'phone': data.get('phone', ''),
                'product': data.get('product', ''),
                'quantity': data.get('quantity', ''),
                'message': data.get('message', ''),
                'received_at': data.get('submittedAt', '')
            }
            inquiries.append(inquiry_record)

            with open(INQUIRIES_FILE, 'w', encoding='utf-8') as f:
                json.dump(inquiries, f, indent=2, ensure_ascii=False)

            print(f"\n[NEW INQUIRY RECEIVED] #{inquiry_record['id']}")
            print(f"  Name: {inquiry_record['name']}")
            print(f"  Phone: {inquiry_record['phone']}")
            print(f"  Product: {inquiry_record['product']} ({inquiry_record['quantity']} pcs)")
            print(f"  Message: {inquiry_record['message']}\n")

            # Dispatch automated Telegram notification to admin
            send_telegram_notification(inquiry_record)

            resp_payload = json.dumps({
                'status': 'success',
                'message': 'Inquiry successfully saved.',
                'inquiryId': inquiry_record['id']
            }).encode('utf-8')

            self.send_response(200)
            self.send_cors_headers()
            self.send_header('Content-Type', 'application/json')
            self.send_header('Content-Length', str(len(resp_payload)))
            self.end_headers()
            self.wfile.write(resp_payload)
            return

        self.send_response(404)
        self.send_cors_headers()
        self.end_headers()

    def serve_json_file(self, filepath):
        if not os.path.exists(filepath):
            self.send_response(404)
            self.send_cors_headers()
            self.end_headers()
            return

        with open(filepath, 'rb') as f:
            content = f.read()

        self.send_response(200)
        self.send_cors_headers()
        self.send_header('Content-Type', 'application/json; charset=utf-8')
        self.send_header('Content-Length', str(len(content)))
        self.end_headers()
        self.wfile.write(content)

    def guess_type(self, path):
        # Override to ensure proper SVGs and JSONs
        mimetypes.add_type('image/svg+xml', '.svg')
        mimetypes.add_type('application/json', '.json')
        return super().guess_type(path)


def run(port=8080):
    server_address = ('', port)
    httpd = ThreadingHTTPServer(server_address, JamoRequestHandler)
    print("=" * 60)
    print(f"🚀 JAMO Textile Corporate Server running at:")
    print(f"   Local:   http://localhost:{port}")
    print(f"   API:     http://localhost:{port}/api/products")
    print(f"            http://localhost:{port}/api/news")
    print(f"            http://localhost:{port}/api/company")
    print(f"            http://localhost:{port}/api/inquiries")
    print("=" * 60)
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\nStopping server...")
        httpd.server_close()

if __name__ == '__main__':
    port = int(sys.argv[1]) if len(sys.argv) > 1 else 8080
    run(port)
