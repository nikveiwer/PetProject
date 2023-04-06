import { ISavedSearches } from '../store/savedSearchesStore/savedSearchesStore';

export type Json = string | number | boolean | null | { [key: string]: Json } | Json[];

export interface Database {
    public: {
        Tables: {
            savedSearches: {
                // Row: ISavedSearches;
                Row: {
                    type: "cats" | "dogs" | "";
                    sort: 'random' | 'recent' | '-recent';
                    breed: string;
                    age: '' | 'baby' | 'young' | 'adult' | 'senior';
                    size: '' | 'small' | 'medium' | 'large' | 'xlarge';
                    gender: string;
                    good_with: '' | 'children' | 'cats' | 'dogs';
                    coat: string;
                    color: string;
                    name: string;
                    id: string;
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
