export interface TopPrediction {
  class_name: string;
  confidence: number;
}

export interface NutritionData {
  calories: number;
  carbs: number;
  sugar: number;
  fiber: number;
  protein: number;
  fat: number;
}

export interface FruitMeta {
  name: string;
  scientific_name: string;
}

export interface PredictResponse {
  prediction: string;
  confidence: number;
  top_predictions: TopPrediction[];
  fruit: FruitMeta;
  nutrition: NutritionData;
}

export interface HealthResponse {
  status: string;
  model_loaded: boolean;
}

export type ScannerState = 'idle' | 'preview' | 'scanning' | 'result' | 'error';
