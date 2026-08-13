# FruitVision AI

**FruitVision AI** is a modern, deep learning-powered web application for instant fruit image classification. Built with **TensorFlow / Keras** and **Streamlit**, it utilizes a custom fine-tuned **MobileNetV2** architecture to identify 11 fruit species, provide confidence scores, extract Top-3 prediction probabilities, and display detailed nutritional profiles.

---

## Overview

FruitVision AI leverages computer vision and transfer learning to classify fruit images captured via camera or uploaded as digital files. The model is fine-tuned to accept $224 \times 224 \times 3$ RGB image inputs and return a 11-class probability distribution via Softmax activation.

---

## Features

- **Instant AI Classification**: Identifies fruit species in real time using a fine-tuned MobileNetV2 deep neural network.
- **Flexible Image Inputs**: Supports file uploads (JPG, JPEG, PNG, WEBP) and live webcam image capture.
- **Top-3 Prediction Breakdown**: Displays the top 3 most probable fruit predictions sorted in descending order with visual progress indicators.
- **Confidence Metrics**: Extracts probability scores directly from the model output without hardcoding or artificial smoothing.
- **Fruit Intelligence & Scientific Data**: Provides scientific binomial names (*e.g., Mangifera indica*) and key health benefits.
- **Nutritional Profiles**: Shows approximate nutritional information per 100g serving (Calories, Carbs, Sugar, Fiber, Protein, Fat, Vitamin C, Potassium).
- **Responsive & Accessible UI**: Clean, minimal, mobile-friendly interface built with custom Streamlit components and styled cards.

---

## Supported Fruits (11 Classes)

| Class Index | Fruit Name | Scientific Name | Emoji |
| :---: | :--- | :--- | :---: |
| `0` | **Apple** | *Malus domestica* | 🍎 |
| `1` | **Banana** | *Musa spp.* | 🍌 |
| `2` | **Burmese grape** | *Baccaurea ramiflora* | 🍇 |
| `3` | **Date** | *Phoenix dactylifera* | 🌴 |
| `4` | **Jambul** | *Syzygium cumini* | 🫐 |
| `5` | **Lemon** | *Citrus limon* | 🍋 |
| `6` | **Lychee** | *Litchi chinensis* | 🍒 |
| `7` | **Mango** | *Mangifera indica* | 🥭 |
| `8` | **Olive** | *Olea europaea* | 🫒 |
| `9` | **Orange** | *Citrus sinensis* | 🍊 |
| `10` | **Red grapes** | *Vitis vinifera* | 🍇 |

---

## Tech Stack

- **Core**: Python 3.11+
- **Deep Learning Framework**: TensorFlow 2.x / Keras
- **Neural Network Backbone**: MobileNetV2
- **Web Application Framework**: Streamlit
- **Numerical Processing**: NumPy
- **Image Processing**: Pillow (PIL)

---

## Project Structure

```text
frut project/
├── .streamlit/
│   └── config.toml          # Streamlit theme and server configuration
├── src/
│   ├── __init__.py          # Package initializer
│   ├── model.py             # Model loader, caching, & architecture validation
│   ├── preprocessing.py     # Image loading, RGB conversion, & tensor formatting
│   ├── prediction.py        # Forward pass inference, argmax, & Top-3 sorting
│   └── fruit_data.py        # 11-class mapping, scientific names, & nutrition data
├── tests/
│   ├── __init__.py          # Test package initializer
│   └── test_prediction.py   # Unit test suite for backend pipeline
├── app.py                   # Streamlit web application entry point
├── MobileNetV2_tuned.h5     # Fine-tuned TensorFlow/Keras model weights
├── requirements.txt         # Project Python dependencies
└── README.md                # Project documentation
```

---

## Installation

To set up FruitVision AI locally on Windows:

```bash
# 1. Clone the repository or navigate to the project directory
cd "frut project"

# 2. Create a Python virtual environment
python -m venv venv

# 3. Activate the virtual environment
venv\Scripts\activate

# 4. Install dependencies
pip install -r requirements.txt
```

---

## Running the Application

Launch the Streamlit web application:

```bash
streamlit run app.py
```

The application will open automatically in your browser at `http://localhost:8501`.

---

## AI Model Architecture & Preprocessing

The application uses the fine-tuned model weights file **`MobileNetV2_tuned.h5`**, which is tracked directly in the repository root.

- **No Runtime Model Download**: The app loads `MobileNetV2_tuned.h5` locally from the workspace. It does NOT download pretrained weights from external servers or Google Drive at runtime.
- **Embedded Preprocessing**: The model architecture embeds an internal `mobilenetv2_preprocess` Lambda layer executing `tf.keras.applications.mobilenet_v2.preprocess_input`. The application resizes images to $224 \times 224 \times 3$ RGB tensors and passes them directly to the model graph without double-scaling.
- **Probability Output**: The final layer is a `Dense(11, activation="softmax")` layer. Predicted classes are determined via `np.argmax()` on the raw probability output.

---

## Deployment (Streamlit Community Cloud)

To deploy FruitVision AI to **Streamlit Community Cloud**:

1. **Push to GitHub**:
   ```bash
   git add .
   git commit -m "Build FruitVision AI application"
   git push origin main
   ```
2. **Deploy on Streamlit**:
   - Log in to [share.streamlit.io](https://share.streamlit.io/).
   - Click **New app**.
   - Select your GitHub repository, branch (`main`), and main file path (`app.py`).
   - Click **Deploy!**.

---

## Limitations & Disclaimer

- **Training Distribution**: Predictions depend on the features learned during model fine-tuning. Images of non-supported fruits or low-quality/blurry images may produce lower confidence scores or misclassifications.
- **Probability Interpretation**: Confidence scores represent model softmax probability outputs and do not guarantee ground-truth correctness.
- **Nutritional Information**: Nutrition values are approximate averages per 100g serving for educational reference and should not be used as medical advice.
- **Camera Access**: Live camera input depends on hardware accessibility and browser permissions.
