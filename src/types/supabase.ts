import { ISavedSearches } from "../store/savedSearchesStore/savedSearchesStore";

export type Json =
    | string
    | number
    | boolean
    | null
    | { [key: string]: Json }
    | Json[];

export interface Database {
    public: {
        Tables: {
            likedAnimals: {
                Row: {
                    breed: string;
                    id: string;
                    api_id: number;
                    imagePath: string;
                    likedAt: string;
                    likedInfo: string;
                    name: string;
                    petLink: string;
                    publishedAt: string;
                    user_id: string;
                };
                Insert: {
                    breed?: string | null;
                    id: string;
                    api_id: number;
                    imagePath?: string | null;
                    likedAt: string;
                    likedInfo?: string | null;
                    name?: string | null;
                    petLink?: string | null;
                    publishedAt: string;
                    user_id?: string;
                };
                Update: {
                    breed?: string | null;
                    id: string;
                    api_id: number;
                    imagePath?: string | null;
                    likedAt?: string;
                    likedInfo?: string | null;
                    name?: string | null;
                    petLink?: string | null;
                    publishedAt?: string;
                    user_id?: string;
                };
            };
            savedSearches: {
                // Row: ISavedSearches;
                Row: {
                    type: "cats" | "dogs" | "";
                    sort: "random" | "recent" | "-recent";
                    breed: string;
                    age: "" | "baby" | "young" | "adult" | "senior";
                    size: "" | "small" | "medium" | "large" | "xlarge";
                    gender: string;
                    good_with: "" | "children" | "cats" | "dogs";
                    coat: string;
                    color: string;
                    name: string;
                    id: string;
                    user_id: string;
                };
                // Insert: Partial<ISavedSearches>;
                Insert: {
                    age?: string;
                    breed?: string;
                    coat?: string;
                    color?: string;
                    gender?: string;
                    good_with?: string;
                    id?: string;
                    name?: string;
                    size?: string;
                    sort?: string;
                    type?: string;
                    user_id?: string;
                };
                // Update: Partial<ISavedSearches>;
                Update: {
                    age?: string;
                    breed?: string;
                    coat?: string;
                    color?: string;
                    gender?: string;
                    good_with?: string;
                    id?: string;
                    name?: string;
                    size?: string;
                    sort?: string;
                    type?: string;
                    user_id?: string;
                };
            };
        };
        Views: {
            [_ in never]: never;
        };
        Functions: {
            [_ in never]: never;
        };
        Enums: {
            [_ in never]: never;
        };
        CompositeTypes: {
            [_ in never]: never;
        };
    };
}
