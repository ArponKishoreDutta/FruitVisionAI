import unittest
import numpy as np
from PIL import Image

from src.model import load_fruit_model, DEFAULT_MODEL_PATH, validate_model
from src.preprocessing import preprocess_image, load_image
from src.prediction import (
    predict,
    extract_probabilities,
    get_predicted_class,
    get_confidence,
    get_top_3_predictions,
)
from src.fruit_data import CLASS_NAMES, FRUIT_METADATA, DISCLAIMER, NUTRITION_LABEL, get_fruit_info


class TestFruitVisionBackend(unittest.TestCase):

    @classmethod
    def setUpClass(cls):
        """Load model once for test suite."""
        cls.model = load_fruit_model()

    def test_01_model_file_existence(self):
        """Test that MobileNetV2_tuned.h5 exists at expected project path."""
        self.assertTrue(DEFAULT_MODEL_PATH.exists(), f"Model file missing at {DEFAULT_MODEL_PATH}")

    def test_02_model_loading_and_architecture(self):
        """Test model instance, input shape, output shape, and class count."""
        self.assertIsNotNone(self.model)
        self.assertEqual(self.model.input_shape, (None, 224, 224, 3))
        self.assertEqual(self.model.output_shape, (None, 11))
        # Verify validation function passes
        validate_model(self.model)

    def test_03_preprocessing_output_shape(self):
        """Test image preprocessor produces float32 tensor of shape (1, 224, 224, 3)."""
        dummy_img = Image.new("RGB", (300, 400), color=(120, 200, 50))
        tensor = preprocess_image(dummy_img)
        self.assertEqual(tensor.shape, (1, 224, 224, 3))
        self.assertEqual(tensor.dtype, np.float32)

    def test_04_valid_probability_output(self):
        """Test model inference forward pass outputs valid probabilities summing to ~1.0."""
        dummy_img = Image.new("RGB", (224, 224), color=(255, 0, 0))
        tensor = preprocess_image(dummy_img)
        predictions = predict(self.model, tensor)
        probs = extract_probabilities(predictions)

        self.assertEqual(len(probs), 11)
        self.assertTrue(np.all(probs >= 0.0), "Probabilities should be non-negative")
        self.assertAlmostEqual(float(np.sum(probs)), 1.0, places=4, msg="Probabilities must sum to 1.0")

    def test_05_top_3_sorting(self):
        """Test Top-3 predictions extraction returns 3 items sorted descending."""
        mock_probs = np.array([0.05, 0.60, 0.01, 0.04, 0.02, 0.03, 0.15, 0.05, 0.02, 0.02, 0.01])
        top_3 = get_top_3_predictions(mock_probs, CLASS_NAMES)

        self.assertEqual(len(top_3), 3)
        self.assertEqual(top_3[0]["class_name"], "Banana")
        self.assertEqual(top_3[0]["class_index"], 1)
        self.assertAlmostEqual(top_3[0]["confidence"], 0.60)

        self.assertEqual(top_3[1]["class_name"], "Lychee")
        self.assertEqual(top_3[1]["class_index"], 6)

        # Check strict descending probability order
        self.assertGreaterEqual(top_3[0]["confidence"], top_3[1]["confidence"])
        self.assertGreaterEqual(top_3[1]["confidence"], top_3[2]["confidence"])

    def test_06_class_mapping_consistency(self):
        """Test class names list contains exactly 11 intended fruit classes in verified order."""
        expected_classes = [
            "Apple",
            "Banana",
            "Burmese grape",
            "Date",
            "Jambul",
            "Lemon",
            "Lychee",
            "Mango",
            "Olive",
            "Orange",
            "Red grapes",
        ]
        self.assertEqual(CLASS_NAMES, expected_classes)
        self.assertEqual(len(CLASS_NAMES), 11)

    def test_07_fruit_metadata_completeness(self):
        """Test fruit metadata contains scientific names, nutrition, and disclaimer for all 11 fruits."""
        self.assertEqual(len(FRUIT_METADATA), 11)
        self.assertEqual(NUTRITION_LABEL, "Approximate nutrition per 100g")
        self.assertIn("educational", DISCLAIMER.lower())

        for fruit_name in CLASS_NAMES:
            info = get_fruit_info(fruit_name)
            self.assertIn("scientific_name", info)
            self.assertIn("nutrition_per_100g", info)
            self.assertIn("health_benefits", info)
            self.assertTrue(len(info["scientific_name"]) > 0)


if __name__ == "__main__":
    unittest.main()
