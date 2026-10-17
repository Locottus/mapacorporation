"""Descarga imagenes y videos del sitio original (uso autorizado por el propietario).

Uso: python tools/download_assets.py
Genera: frontend/public/media/img/* y frontend/public/media/video/*.mp4
Requiere: pip install imageio-ffmpeg
"""
import json
import os
import re
import subprocess
import urllib.request

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
IMG_DIR = os.path.join(ROOT, "frontend", "public", "media", "img")
VID_DIR = os.path.join(ROOT, "frontend", "public", "media", "video")
SITE = "https://www.mapacorporation.com"
UA = {"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/130 Safari/537.36"}

IMAGES = [
    "30f4b3_019f0f86497343e2a42e52d6c33f3428~mv2.jpg",
    "30f4b3_15d9150129bb40ddb8d06fa212458c9f~mv2.png",
    "30f4b3_d964f88d12774ca9bb6bce3dae3808d5~mv2.jpg",
    "30f4b3_3fc14255a97644a89559dcadb40a3703~mv2.png",
    "30f4b3_942f17a9f2554dc193ff387b0940c673~mv2.png",
    "30f4b3_373df7185d20402ea5df7c4b8296306e~mv2.png",
    "30f4b3_999bd101fde646e9a00d9a29a65f0226~mv2.jpg",
    "30f4b3_ea244392ea944f18981c584d92f8c4d2~mv2.png",
    "30f4b3_62cf735f77b04e4096b6af29c4cbb1fe~mv2.jpg",
    "30f4b3_3f9747d5a1a546dfbfc42b4f3715afee~mv2.png",
    "30f4b3_11ff50b72d2b48f2921008a8e7e8ed83~mv2.png",
    "30f4b3_240319d0ba3943b2a0d70f450439c348~mv2.png",
    "30f4b3_73ebadfb57f748a6b5dfd5d00b02b07f~mv2.png",
    "30f4b3_ca3e183db3584666af7e770bdd496482~mv2.png",
    "30f4b3_64bab57ae3a64817b62a6afb7e9c6ca8~mv2.png",
    "30f4b3_9a5cc81e4900459dbd1d25b6ccf8fc15~mv2.png",
    "30f4b3_958be6ff5ef54724b6fb9d4e676620d7~mv2.png",
    "30f4b3_c35e0febab724b9aaf67c787d3f090b1~mv2.png",
    "30f4b3_3f78ed0c8c134ddd9ef739cc444a41a0~mv2.png",
    "30f4b3_2300245370a6420497d6c68e8c4df154~mv2.png",
    "30f4b3_aea664ee40a045fcbe61b11c4c318e63~mv2.png",
    "30f4b3_14d4b01a9fa9419cb1bc6bdc00ccbc91~mv2.png",
    "30f4b3_b19b8c935ea848ecb2e016059bc75977~mv2.png",
    "30f4b3_3bd29201f3cb4a0a93161af4165f5382~mv2.png",
    "30f4b3_50942fa559244a1b805606db87d80dcd~mv2.jpg",
    "30f4b3_9951b6de185c45108ff5f0bfe4df37db~mv2.png",
    "30f4b3_b54ee1b46a7b45a2bd9ea5a50a874bdc~mv2.png",
    "30f4b3_fc84c442ed974d229b07c1af91eeb9d4~mv2.png",
    "30f4b3_f7ad3e5399444318a661ca66e57c3065~mv2.png",
    "30f4b3_f7e5bb372adb49c3970812df85be2a26~mv2.png",
    "30f4b3_acfc48c87c184293ba8a52ec1555d917~mv2.png",
    "30f4b3_3413a9625be145228ef9fe284eea04b4~mv2.jpg",
    "30f4b3_8ca93d8bccd0413bbe46401a11ce2a4e~mv2.png",
    "30f4b3_c4c873a5aef84265b4489ee53a293e1b~mv2.png",
    "30f4b3_3a5b2498a158463e999c8cce099a35aa~mv2.png",
    "30f4b3_69e0817d37084dc785acaf46cd9895ca~mv2.png",
    "30f4b3_900bbf9bab1649c29a1eb28e76792c78~mv2.png",
    "30f4b3_62ce40e387dc408fa36edc85a1dd7095~mv2.png",
]

# id de video -> sufijo del poster
VIDEOS = {
    "30f4b3_e69e6e84feb449179324777b6af7861d": "f000",
    "30f4b3_1b19145105944c429f8eecbe688965c2": "f002",
    "30f4b3_53367de428c2493e8b6f731c1abd84f5": "f002",
    "30f4b3_7c530873d7a44897a7e880d935d20e2d": "f002",
    "30f4b3_89ef5e3251034f57bd40a9aa956f6dd5": "f002",
    "30f4b3_2a5959c8f9e54aba8911b84adce9a8d1": "f002",
    "30f4b3_9c8e503ef67a42efb21491b329dfc16c": "f002",
    "30f4b3_473c17bd55bf4c0b95b5e690ad7ffc29": "f000",
    "30f4b3_2593709ae0014e9b80c0b0a14df36267": "f002",
    "30f4b3_76e9cbdf2823413e8b79988eae21a949": "f002",
    "30f4b3_c2b056b7bc804eadb5a3d9686faec036": "f000",
    "30f4b3_9598316e31104ed889b1e1da06d1ed82": "f002",
    "30f4b3_3de1736636a9422aa7fae01d2e3bbb3c": "f002",
    "30f4b3_00d8b465de8b43848ce0dd6fbc9e2501": "f001",
}


def get(url):
    with urllib.request.urlopen(urllib.request.Request(url, headers=UA), timeout=60) as r:
        return r.read()


def local_name(media_id):
    return media_id.replace("~mv2", "")


def download_images():
    os.makedirs(IMG_DIR, exist_ok=True)
    names = list(IMAGES) + [f"{vid}{suffix}.jpg" for vid, suffix in VIDEOS.items()]
    for name in names:
        target = os.path.join(IMG_DIR, local_name(name))
        if os.path.exists(target):
            continue
        with open(target, "wb") as f:
            f.write(get(f"https://static.wixstatic.com/media/{name}"))
        print("img", local_name(name))


def find_stream_urls():
    urls = {}
    pattern = re.compile(
        r"https://[a-z\-]*repackager\.wixmp\.com/video\.wixstatic\.com/video/(30f4b3_[0-9a-f]{32})/"
        r"[^\"?]*?/mp4/file\.mp4\.urlset/master\.m3u8\?token=[A-Za-z0-9._\-]+"
    )
    for path in ("/testimonios", "/copia-de-contacto"):
        html = get(SITE + path).decode("utf-8", "replace").replace("\\/", "/")
        for m in pattern.finditer(html):
            urls.setdefault(m.group(1), m.group(0))
    return urls


def download_videos():
    import imageio_ffmpeg

    ffmpeg = imageio_ffmpeg.get_ffmpeg_exe()
    os.makedirs(VID_DIR, exist_ok=True)
    urls = find_stream_urls()
    missing = []
    for vid in VIDEOS:
        target = os.path.join(VID_DIR, f"{vid}.mp4")
        if os.path.exists(target):
            continue
        url = urls.get(vid)
        if not url:
            missing.append(vid)
            continue
        cmd = [ffmpeg, "-loglevel", "error", "-y", "-user_agent", UA["User-Agent"], "-i", url,
               "-map", "0:p:0?", "-c", "copy", "-bsf:a", "aac_adtstoasc", "-movflags", "+faststart", target]
        res = subprocess.run(cmd, capture_output=True, text=True)
        if res.returncode != 0:
            missing.append(vid)
            print("video FAIL", vid, res.stderr[-300:])
        else:
            print("video", vid)
    return missing


if __name__ == "__main__":
    download_images()
    print(json.dumps({"missing_videos": download_videos()}))
