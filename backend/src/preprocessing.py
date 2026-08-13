import io
from typing import Union
import numpy as np
from PIL import Image

TARGET_IMAGE_SIZE = (224, 224)


def load_image(image_input: Union[str, bytes, io.BytesIO, Image.Image]) -> Image.Image:
    """
    Safely opens and converts input image to PIL Image.
    Supports PIL Image instances, file paths, raw bytes, or BytesIO buffers.
    """
    if isinstance(image_input, Image.Image):
        return image_input
    elif isinstance(image_input, (str, bytes, io.BytesIO)):
        if isinstance(image_input, bytes):
            image_input = io.BytesIO(image_input)
        return Image.open(image_input)
    else:
        raise TypeError(f"Unsupported image input type: {type(image_input)}")


def preprocess_image(image_input: Union[str, bytes, io.BytesIO, Image.Image]) -> np.ndarray:
    """
    Preprocesses image for the FruitVision MobileNetV2_tuned model:
    1. Safely opens image
    2. Converts to 3-channel RGB
    3. Resizes to 224x224 pixels
    4. Converts to float32 NumPy array with shape (1, 224, 224, 3)

    NOTE: Does NOT call MobileNetV2 preprocess_input() because the saved model
    already embeds the mobilenetv2_preprocess Lambda layer internally.
    """
    img = load_image(image_input)
    
    # Ensure RGB channels (handles RGBA, Grayscale, etc.)
    if img.mode != "RGB":
        img = img.convert("RGB")
        
    # Resize to exact target input dimensions
    img_resized = img.resize(TARGET_IMAGE_SIZE, Image.Resampling.BILINEAR)
    
    # Convert to float32 NumPy array
    img_array = np.array(img_resized, dtype=np.float32)
    
    # Expand dims for batch dimension: (224, 224, 3) -> (1, 224, 224, 3)
    tensor = np.expand_dims(img_array, axis=0)
    
    return tensor
