import streamlit as st
from PIL import Image
import numpy as np

from src.model import load_fruit_model
from src.preprocessing import preprocess_image
from src.prediction import (
    predict,
    extract_probabilities,
    get_predicted_class,
    get_confidence,
    get_top_3_predictions,
)
from src.fruit_data import (
    CLASS_NAMES,
    FRUIT_METADATA,
    NUTRITION_LABEL,
    DISCLAIMER,
    get_fruit_info,
)

# -----------------------------------------------------------------------------
# PAGE CONFIGURATION & STYLING
# -----------------------------------------------------------------------------
st.set_page_config(
    page_title="FruitVision AI — Fruit Classification",
    page_icon="🍎",
    layout="wide",
    initial_sidebar_state="collapsed",
)

# Modern, clean, minimal custom CSS for rounded cards, typography, and badges
st.markdown(
    """
    <style>
    /* Main container background and font setup */
    .stApp {
        background-color: #F8F9FA;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    }
    
    /* Hero Banner Styling */
    .hero-card {
        background: linear-gradient(135deg, #FFFFFF 0%, #F1F8E9 100%);
        border: 1px solid #E2E8F0;
        border-radius: 16px;
        padding: 24px 32px;
        margin-bottom: 24px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.03);
    }
    
    .hero-title {
        color: #1B5E20;
        font-size: 2.2rem;
        font-weight: 800;
        margin-bottom: 4px;
        display: flex;
        align-items: center;
        gap: 12px;
    }
    
    .hero-subtitle {
        color: #334155;
        font-size: 1.1rem;
        font-weight: 600;
        margin-bottom: 8px;
    }
    
    .hero-desc {
        color: #64748B;
        font-size: 0.95rem;
        margin-bottom: 16px;
    }
    
    /* Status Badges */
    .badge-ready {
        background-color: #E8F5E9;
        color: #2E7D32;
        border: 1px solid #C8E6C9;
        padding: 6px 14px;
        border-radius: 20px;
        font-weight: 600;
        font-size: 0.85rem;
        display: inline-flex;
        align-items: center;
        gap: 6px;
    }

    .badge-error {
        background-color: #FFEBEE;
        color: #C62828;
        border: 1px solid #FFCDD2;
        padding: 6px 14px;
        border-radius: 20px;
        font-weight: 600;
        font-size: 0.85rem;
        display: inline-flex;
        align-items: center;
        gap: 6px;
    }

    /* Content Cards */
    .content-card {
        background-color: #FFFFFF;
        border: 1px solid #E2E8F0;
        border-radius: 16px;
        padding: 24px;
        margin-bottom: 24px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.02);
    }

    .card-title {
        color: #1E293B;
        font-size: 1.25rem;
        font-weight: 700;
        margin-bottom: 16px;
        border-bottom: 2px solid #F1F5F9;
        padding-bottom: 8px;
    }

    /* Result Highlight */
    .result-title {
        color: #1B5E20;
        font-size: 2rem;
        font-weight: 800;
        margin: 0;
    }
    
    .scientific-title {
        color: #64748B;
        font-size: 1.1rem;
        font-style: italic;
        margin-bottom: 12px;
    }

    .confidence-large {
        color: #2E7D32;
        font-size: 2.2rem;
        font-weight: 800;
    }

    /* Grid Fruit Cards */
    .fruit-pill {
        background-color: #F8FAFC;
        border: 1px solid #E2E8F0;
        border-radius: 12px;
        padding: 12px 16px;
        text-align: center;
        font-weight: 600;
        color: #334155;
        font-size: 0.95rem;
        transition: all 0.2s ease;
    }

    /* Warning Notice */
    .warning-box {
        background-color: #FFFBEB;
        border: 1px solid #FDE68A;
        border-radius: 10px;
        padding: 12px 16px;
        color: #92400E;
        font-size: 0.85rem;
        margin-top: 16px;
    }

    .disclaimer-box {
        background-color: #F8FAFC;
        border-left: 4px solid #94A3B8;
        padding: 12px 16px;
        color: #64748B;
        font-size: 0.85rem;
        margin-top: 16px;
    }
    </style>
    """,
    unsafe_allow_html=True,
)

# -----------------------------------------------------------------------------
# SESSION STATE INITIALIZATION
# -----------------------------------------------------------------------------
if "current_image" not in st.session_state:
    st.session_state.current_image = None
if "image_id" not in st.session_state:
    st.session_state.image_id = None
if "prediction_results" not in st.session_state:
    st.session_state.prediction_results = None

# -----------------------------------------------------------------------------
# MODEL LOADING
# -----------------------------------------------------------------------------
model = None
model_error = None
try:
    model = load_fruit_model()
except Exception as e:
    model_error = str(e)

# -----------------------------------------------------------------------------
# HERO HEADER SECTION
# -----------------------------------------------------------------------------
status_html = (
    '<span class="badge-ready">● AI Model Ready</span>'
    if model is not None
    else f'<span class="badge-error">● Model Error: {model_error}</span>'
)

st.markdown(
    f"""
    <div class="hero-card">
        <div class="hero-title">🍎 FruitVision AI</div>
        <div class="hero-subtitle">Identify fruits instantly with AI</div>
        <div class="hero-desc">Upload a fruit image or use your camera to identify the fruit using a fine-tuned MobileNetV2 deep learning model.</div>
        <div>{status_html}</div>
    </div>
    """,
    unsafe_allow_html=True,
)

if model is None:
    st.error(f"Unable to initialize AI Model backend. Details: {model_error}")

# -----------------------------------------------------------------------------
# MAIN WORKSPACE LAYOUT (2 COLUMNS FOR DESKTOP / STACKED ON MOBILE)
# -----------------------------------------------------------------------------
col_input, col_output = st.columns([1, 1], gap="large")

# -----------------------------------------------------------------------------
# LEFT COLUMN: IMAGE INPUT & ANALYSIS CONTROLS
# -----------------------------------------------------------------------------
with col_input:
    st.markdown('<div class="card-title">📷 Upload Your Fruit</div>', unsafe_allow_html=True)
    
    input_tab1, input_tab2 = st.tabs(["📁 Upload Image", "📸 Use Camera"])
    
    uploaded_file = None
    camera_file = None
    
    with input_tab1:
        uploaded_file = st.file_uploader(
            "Choose a fruit image...",
            type=["jpg", "jpeg", "png", "webp"],
            help="Supported formats: JPG, JPEG, PNG, WEBP",
            key="file_uploader",
        )
        
    with input_tab2:
        camera_file = st.camera_input("Take a photo of a fruit", key="camera_input")

    # Determine active input source
    raw_image_source = uploaded_file if uploaded_file is not None else camera_file
    
    if raw_image_source is not None:
        # Create a unique identifier for the current upload to detect changes
        file_id = getattr(raw_image_source, "file_id", getattr(raw_image_source, "name", str(hash(raw_image_source))))
        if st.session_state.image_id != file_id:
            try:
                pil_img = Image.open(raw_image_source)
                st.session_state.current_image = pil_img
                st.session_state.image_id = file_id
                st.session_state.prediction_results = None  # Clear previous results on new image selection
            except Exception as img_err:
                st.error(f"Invalid or corrupted image file: {img_err}")
                st.session_state.current_image = None
                st.session_state.image_id = None
                st.session_state.prediction_results = None
    
    # Image Preview & Action Button
    if st.session_state.current_image is not None:
        st.image(
            st.session_state.current_image,
            caption="Selected Image Preview",
            use_container_width=True,
        )
        
        analyze_clicked = st.button(
            "🔍 Analyze Fruit",
            type="primary",
            use_container_width=True,
            disabled=(model is None),
        )
        
        if analyze_clicked and model is not None:
            with st.spinner("Analyzing image with MobileNetV2 model..."):
                try:
                    # Execute backend preprocessing & forward pass
                    tensor = preprocess_image(st.session_state.current_image)
                    preds = predict(model, tensor)
                    probs = extract_probabilities(preds)
                    
                    pred_idx, pred_name = get_predicted_class(probs, CLASS_NAMES)
                    confidence = get_confidence(probs, pred_idx)
                    top_3 = get_top_3_predictions(probs, CLASS_NAMES)
                    fruit_info = get_fruit_info(pred_name)
                    
                    # Store results in session state
                    st.session_state.prediction_results = {
                        "pred_idx": pred_idx,
                        "pred_name": pred_name,
                        "confidence": confidence,
                        "top_3": top_3,
                        "fruit_info": fruit_info,
                    }
                except Exception as pred_err:
                    st.error(f"An error occurred during prediction: {pred_err}")
    else:
        st.info("Please upload an image or take a photo to enable analysis.")

# -----------------------------------------------------------------------------
# RIGHT COLUMN: PREDICTION RESULTS & FRUIT METADATA
# -----------------------------------------------------------------------------
with col_output:
    if st.session_state.prediction_results is not None:
        results = st.session_state.prediction_results
        info = results["fruit_info"]
        conf_pct = results["confidence"] * 100
        
        # Primary Prediction Result Card
        st.markdown('<div class="card-title">🎯 Prediction Result</div>', unsafe_allow_html=True)
        
        res_col1, res_col2 = st.columns([2, 1])
        with res_col1:
            st.markdown(f'<div class="result-title">{info["name"]}</div>', unsafe_allow_html=True)
            st.markdown(f'<div class="scientific-title">Scientific name: {info["scientific_name"]}</div>', unsafe_allow_html=True)
        with res_col2:
            st.markdown(f'<div class="confidence-large">{conf_pct:.2f}%</div>', unsafe_allow_html=True)
            st.caption("Confidence Score")

        st.progress(float(results["confidence"]))

        st.divider()

        # Top-3 Predictions Breakdown
        st.markdown("##### 📊 Top Predictions")
        for item in results["top_3"]:
            c_name = item["class_name"]
            c_pct = item["confidence"] * 100
            t_col1, t_col2 = st.columns([3, 1])
            with t_col1:
                st.write(f"**{c_name}**")
            with t_col2:
                st.write(f"**{c_pct:.2f}%**")
            st.progress(float(item["confidence"]))

        st.divider()

        # Nutritional Information Section
        st.markdown(f"##### 🍏 {NUTRITION_LABEL}")
        nut = info["nutrition_per_100g"]
        
        n_col1, n_col2, n_col3, n_col4 = st.columns(4)
        with n_col1:
            st.metric("Calories", nut["calories"])
            st.metric("Protein", nut["protein"])
        with n_col2:
            st.metric("Carbs", nut["carbohydrates"])
            st.metric("Fat", nut["fat"])
        with n_col3:
            st.metric("Sugar", nut["sugar"])
            st.metric("Vitamin C", nut["vitamin_c"])
        with n_col4:
            st.metric("Fiber", nut["dietary_fiber"])
            st.metric("Potassium", nut["potassium"])

        # Health Benefits & Description
        st.markdown("##### 💡 Key Health Benefits")
        for benefit in info["health_benefits"]:
            st.markdown(f"• {benefit}")
            
        # Warning & Disclaimer Boxes
        st.markdown(
            '<div class="warning-box">⚠️ <strong>Notice:</strong> Confidence represents the model\'s prediction probability and does not guarantee that the classification is correct.</div>',
            unsafe_allow_html=True,
        )
        st.markdown(
            f'<div class="disclaimer-box">{DISCLAIMER}</div>',
            unsafe_allow_html=True,
        )

    else:
        st.markdown('<div class="card-title">🎯 Prediction Results</div>', unsafe_allow_html=True)
        st.markdown(
            """
            <div style="text-align: center; padding: 48px 16px; color: #94A3B8;">
                <div style="font-size: 3rem; margin-bottom: 12px;">🥗</div>
                <div style="font-size: 1.1rem; font-weight: 600; color: #64748B;">No Prediction Generated Yet</div>
                <div style="font-size: 0.9rem; margin-top: 4px;">Upload or capture a fruit image on the left and click <strong>Analyze Fruit</strong> to see AI classification and nutritional insights.</div>
            </div>
            """,
            unsafe_allow_html=True,
        )

# -----------------------------------------------------------------------------
# LOWER SECTION: SUPPORTED FRUITS & ABOUT THE MODEL
# -----------------------------------------------------------------------------
st.divider()

col_supp, col_about = st.columns([3, 2], gap="large")

with col_supp:
    st.markdown('<div class="card-title">🍎 Supported Fruits (11 Classes)</div>', unsafe_allow_html=True)
    
    fruit_emojis = [
        ("Apple", "🍎"),
        ("Banana", "🍌"),
        ("Burmese grape", "🍇"),
        ("Date", "🌴"),
        ("Jambul", "🫐"),
        ("Lemon", "🍋"),
        ("Lychee", "🍒"),
        ("Mango", "🥭"),
        ("Olive", "🫒"),
        ("Orange", "🍊"),
        ("Red grapes", "🍇"),
    ]
    
    # 4 responsive columns for fruit grid
    grid_cols = st.columns(4)
    for idx, (f_name, f_emoji) in enumerate(fruit_emojis):
        with grid_cols[idx % 4]:
            st.markdown(
                f'<div class="fruit-pill" style="margin-bottom: 8px;">{f_emoji} {f_name}</div>',
                unsafe_allow_html=True,
            )

with col_about:
    st.markdown('<div class="card-title">ℹ️ About the AI Model</div>', unsafe_allow_html=True)
    
    m_col1, m_col2 = st.columns(2)
    with m_col1:
        st.write("**Model Architecture:**")
        st.write("MobileNetV2")
        st.write("**Framework:**")
        st.write("TensorFlow / Keras")
    with m_col2:
        st.write("**Input Size:**")
        st.write("224 × 224 × 3")
        st.write("**Supported Classes:**")
        st.write("11 Output Classes")
        
    st.write("**Task:** Fruit Image Classification")
