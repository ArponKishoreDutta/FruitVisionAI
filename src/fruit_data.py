"""
FruitVision AI - Fruit Metadata & Nutrition Database
Contains scientific names, approximate nutrition per 100g, health benefits, and educational disclaimers.
"""

from typing import Dict, List, Any

# Verified 11-class ordered mapping from original training process (train_ds.class_names)
CLASS_NAMES: List[str] = [
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

NUTRITION_LABEL: str = "Approximate nutrition per 100g"

DISCLAIMER: str = (
    "Disclaimer: Nutrition values and fruit information are provided for educational "
    "and informational purposes only based on average values per 100g serving. "
    "This information should not be used as medical advice, diagnosis, or treatment."
)

FRUIT_METADATA: Dict[str, Dict[str, Any]] = {
    "Apple": {
        "class_index": 0,
        "name": "Apple",
        "scientific_name": "Malus domestica",
        "description": "Crisp, sweet, or tart pomaceous fruit rich in dietary fiber and Vitamin C.",
        "nutrition_per_100g": {
            "calories": "52 kcal",
            "carbohydrates": "13.8 g",
            "sugar": "10.4 g",
            "dietary_fiber": "2.4 g",
            "protein": "0.3 g",
            "fat": "0.2 g",
            "vitamin_c": "4.6 mg (8% DV)",
            "potassium": "107 mg",
        },
        "health_benefits": [
            "Supports heart health and healthy digestion via pectin fiber",
            "Rich in quercetin and polyphenolic antioxidants",
            "Helps regulate blood sugar levels",
        ],
        "season": "Autumn / Year-round",
    },
    "Banana": {
        "class_index": 1,
        "name": "Banana",
        "scientific_name": "Musa spp.",
        "description": "Sweet, tropical elongated fruit packed with energy, potassium, and Vitamin B6.",
        "nutrition_per_100g": {
            "calories": "89 kcal",
            "carbohydrates": "22.8 g",
            "sugar": "12.2 g",
            "dietary_fiber": "2.6 g",
            "protein": "1.1 g",
            "fat": "0.3 g",
            "vitamin_c": "8.7 mg (15% DV)",
            "potassium": "358 mg (10% DV)",
        },
        "health_benefits": [
            "Excellent quick source of natural energy for athletic recovery",
            "High potassium content supports electrolyte balance and blood pressure",
            "Contains resistant starch aiding gut health",
        ],
        "season": "Year-round",
    },
    "Burmese grape": {
        "class_index": 2,
        "name": "Burmese grape",
        "scientific_name": "Baccaurea ramiflora",
        "description": "Tangy, sweet-and-sour Southeast Asian tropical fruit rich in Vitamin C and organic acids.",
        "nutrition_per_100g": {
            "calories": "55 kcal",
            "carbohydrates": "14.1 g",
            "sugar": "9.5 g",
            "dietary_fiber": "1.8 g",
            "protein": "0.7 g",
            "fat": "0.1 g",
            "vitamin_c": "35.0 mg (58% DV)",
            "potassium": "190 mg",
        },
        "health_benefits": [
            "High Vitamin C content boosts immune system function",
            "Traditional medicinal uses for skin vitality and digestion",
            "Rich in phytochemicals and natural antioxidants",
        ],
        "season": "Summer (April – June)",
    },
    "Date": {
        "class_index": 3,
        "name": "Date",
        "scientific_name": "Phoenix dactylifera",
        "description": "Naturally sweet, chewy stone fruit from date palm trees, packed with minerals and fiber.",
        "nutrition_per_100g": {
            "calories": "277 kcal",
            "carbohydrates": "75.0 g",
            "sugar": "66.5 g",
            "dietary_fiber": "6.7 g",
            "protein": "1.8 g",
            "fat": "0.2 g",
            "vitamin_c": "0.4 mg",
            "potassium": "656 mg (19% DV)",
        },
        "health_benefits": [
            "Dense natural sweetness providing sustained carbohydrate energy",
            "High dietary fiber content supports digestive regularity",
            "Rich in potassium, magnesium, and flavonoids",
        ],
        "season": "Autumn",
    },
    "Jambul": {
        "class_index": 4,
        "name": "Jambul",
        "scientific_name": "Syzygium cumini",
        "description": "Deep purple, astringent and sweet tropical berry also known as Java plum or Jamun.",
        "nutrition_per_100g": {
            "calories": "60 kcal",
            "carbohydrates": "15.5 g",
            "sugar": "10.0 g",
            "dietary_fiber": "1.5 g",
            "protein": "0.7 g",
            "fat": "0.2 g",
            "vitamin_c": "18.0 mg (30% DV)",
            "potassium": "79 mg",
        },
        "health_benefits": [
            "Contains jamboline and anthocyanins known to assist glucose metabolism",
            "Potent antioxidant properties from dark purple pigments",
            "Promotes digestive health and oral hygiene",
        ],
        "season": "Monsoon / Summer (June – August)",
    },
    "Lemon": {
        "class_index": 5,
        "name": "Lemon",
        "scientific_name": "Citrus limon",
        "description": "Vibrant yellow, sour citrus fruit prized for its refreshing juice, zest, and citric acid.",
        "nutrition_per_100g": {
            "calories": "29 kcal",
            "carbohydrates": "9.3 g",
            "sugar": "2.5 g",
            "dietary_fiber": "2.8 g",
            "protein": "1.1 g",
            "fat": "0.3 g",
            "vitamin_c": "53.0 mg (88% DV)",
            "potassium": "138 mg",
        },
        "health_benefits": [
            "Outstanding source of Vitamin C for immune defense",
            "Citric acid aids kidney stone prevention and digestion",
            "Enhances iron absorption from plant-based foods",
        ],
        "season": "Year-round",
    },
    "Lychee": {
        "class_index": 6,
        "name": "Lychee",
        "scientific_name": "Litchi chinensis",
        "description": "Fragrant, translucent white tropical aril fruit encased in a bumpy pink-red rind.",
        "nutrition_per_100g": {
            "calories": "66 kcal",
            "carbohydrates": "16.5 g",
            "sugar": "15.2 g",
            "dietary_fiber": "1.3 g",
            "protein": "0.8 g",
            "fat": "0.4 g",
            "vitamin_c": "71.5 mg (119% DV)",
            "potassium": "171 mg",
        },
        "health_benefits": [
            "Contains oligonol and polyphenols supporting cardiovascular flow",
            "Exceptionally high Vitamin C concentration",
            "Promotes hydration and skin radiance",
        ],
        "season": "Summer (May – July)",
    },
    "Mango": {
        "class_index": 7,
        "name": "Mango",
        "scientific_name": "Mangifera indica",
        "description": "Luscious, juicy tropical stone fruit known worldwide as the 'King of Fruits'.",
        "nutrition_per_100g": {
            "calories": "60 kcal",
            "carbohydrates": "15.0 g",
            "sugar": "13.7 g",
            "dietary_fiber": "1.6 g",
            "protein": "0.8 g",
            "fat": "0.4 g",
            "vitamin_c": "36.4 mg (60% DV)",
            "potassium": "168 mg",
        },
        "health_benefits": [
            "Rich in beta-carotene and Vitamin A supporting eye health",
            "Contains digestive enzymes like amylases that break down carbohydrates",
            "High antioxidant content including mangiferin",
        ],
        "season": "Summer (May – August)",
    },
    "Olive": {
        "class_index": 8,
        "name": "Olive",
        "scientific_name": "Olea europaea",
        "description": "Savory Mediterranean drupe rich in heart-healthy monounsaturated oleic acid.",
        "nutrition_per_100g": {
            "calories": "115 kcal",
            "carbohydrates": "6.3 g",
            "sugar": "0.5 g",
            "dietary_fiber": "3.2 g",
            "protein": "0.8 g",
            "fat": "10.7 g (Monounsaturated: 7.7g)",
            "vitamin_c": "0.9 mg",
            "potassium": "42 mg",
        },
        "health_benefits": [
            "Monounsaturated fatty acids support cardiovascular longevity",
            "Rich in Vitamin E and powerful anti-inflammatory oleocanthal",
            "Supports healthy cholesterol ratios",
        ],
        "season": "Autumn / Winter",
    },
    "Orange": {
        "class_index": 9,
        "name": "Orange",
        "scientific_name": "Citrus sinensis",
        "description": "Juicy, sweet citrus fruit famous for its bright color, flavor, and immune-supporting nutrients.",
        "nutrition_per_100g": {
            "calories": "47 kcal",
            "carbohydrates": "11.8 g",
            "sugar": "9.4 g",
            "dietary_fiber": "2.4 g",
            "protein": "0.9 g",
            "fat": "0.1 g",
            "vitamin_c": "53.2 mg (89% DV)",
            "potassium": "181 mg",
        },
        "health_benefits": [
            "Classic high-capacity Vitamin C source for cellular protection",
            "Contains hesperidin flavonoid for vascular wellness",
            "Dietary fiber aids cholesterol balance",
        ],
        "season": "Winter / Year-round",
    },
    "Red grapes": {
        "class_index": 10,
        "name": "Red grapes",
        "scientific_name": "Vitis vinifera",
        "description": "Sweet, juicy berries packed with resveratrol and polyphenolic antioxidants.",
        "nutrition_per_100g": {
            "calories": "69 kcal",
            "carbohydrates": "18.1 g",
            "sugar": "15.5 g",
            "dietary_fiber": "0.9 g",
            "protein": "0.7 g",
            "fat": "0.2 g",
            "vitamin_c": "3.2 mg (5% DV)",
            "potassium": "191 mg",
        },
        "health_benefits": [
            "Rich in resveratrol and anthocyanins supporting heart health",
            "Promotes vascular endothelium elasticity and circulation",
            "High water content aids cellular hydration",
        ],
        "season": "Autumn / Year-round",
    },
}


def get_fruit_info(fruit_name: str) -> Dict[str, Any]:
    """
    Retrieves metadata for a specific fruit name.
    Raises KeyError if fruit_name is invalid.
    """
    if fruit_name not in FRUIT_METADATA:
        raise KeyError(f"Fruit '{fruit_name}' not found in database.")
    return FRUIT_METADATA[fruit_name]
