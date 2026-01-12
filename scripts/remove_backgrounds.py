#!/usr/bin/env python3
"""
Script to remove backgrounds from product images using rembg.
"""

from pathlib import Path
from rembg import remove
from PIL import Image
import io

# Paths
IMAGES_DIR = Path(__file__).parent.parent / "public" / "images" / "products"

# Images to process
IMAGES = [
    "solar-module.png",
    "inverter.png", 
    "battery.png",
]

def remove_background(image_path: Path) -> None:
    """Remove background from a single image."""
    print(f"Processing: {image_path.name}")
    
    # Read the image
    with open(image_path, "rb") as f:
        input_data = f.read()
    
    # Remove background
    output_data = remove(input_data)
    
    # Save the result (overwrite original)
    output_image = Image.open(io.BytesIO(output_data))
    output_image.save(image_path, "PNG")
    
    print(f"  ✓ Background removed: {image_path.name}")

def main():
    print("=" * 50)
    print("Removing backgrounds from product images...")
    print("=" * 50)
    
    for image_name in IMAGES:
        image_path = IMAGES_DIR / image_name
        if image_path.exists():
            remove_background(image_path)
        else:
            print(f"  ✗ Not found: {image_name}")
    
    print("=" * 50)
    print("Done! All backgrounds removed.")
    print("=" * 50)

if __name__ == "__main__":
    main()

