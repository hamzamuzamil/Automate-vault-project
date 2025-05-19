export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface Database {
  public: {
    Tables: {
      categories: {
        Row: {
          id: number
          name: string
          slug: string
          description: string | null
          icon: string | null
          created_at: string
        }
        Insert: {
          id?: number
          name: string
          slug: string
          description?: string | null
          icon?: string | null
          created_at?: string
        }
        Update: {
          id?: number
          name?: string
          slug?: string
          description?: string | null
          icon?: string | null
          created_at?: string
        }
        Relationships: []
      }
      chat_history: {
        Row: {
          id: number
          user_id: string
          message: string
          is_user: boolean
          created_at: string
        }
        Insert: {
          id?: number
          user_id: string
          message: string
          is_user: boolean
          created_at?: string
        }
        Update: {
          id?: number
          user_id?: string
          message?: string
          is_user?: boolean
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "chat_history_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          id: string
          email: string
          full_name: string | null
          avatar_url: string | null
          is_admin: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          full_name?: string | null
          avatar_url?: string | null
          is_admin?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          full_name?: string | null
          avatar_url?: string | null
          is_admin?: boolean
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey"
            columns: ["id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      prompts: {
        Row: {
          id: number
          category_id: number | null
          content: string
          created_at: string
        }
        Insert: {
          id?: number
          category_id?: number | null
          content: string
          created_at?: string
        }
        Update: {
          id?: number
          category_id?: number | null
          content?: string
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "prompts_category_id_fkey"
            columns: ["category_id"]
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
        ]
      }
      purchases: {
        Row: {
          id: number
          user_id: string | null
          template_id: number | null
          amount: number
          payment_intent_id: string | null
          payment_status: string
          created_at: string
        }
        Insert: {
          id?: number
          user_id?: string | null
          template_id?: number | null
          amount: number
          payment_intent_id?: string | null
          payment_status: string
          created_at?: string
        }
        Update: {
          id?: number
          user_id?: string | null
          template_id?: number | null
          amount?: number
          payment_intent_id?: string | null
          payment_status?: string
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "purchases_template_id_fkey"
            columns: ["template_id"]
            referencedRelation: "templates"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "purchases_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      tags: {
        Row: {
          id: number
          name: string
          created_at: string
        }
        Insert: {
          id?: number
          name: string
          created_at?: string
        }
        Update: {
          id?: number
          name?: string
          created_at?: string
        }
        Relationships: []
      }
      template_tags: {
        Row: {
          template_id: number
          tag_id: number
        }
        Insert: {
          template_id: number
          tag_id: number
        }
        Update: {
          template_id?: number
          tag_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "template_tags_tag_id_fkey"
            columns: ["tag_id"]
            referencedRelation: "tags"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "template_tags_template_id_fkey"
            columns: ["template_id"]
            referencedRelation: "templates"
            referencedColumns: ["id"]
          },
        ]
      }
      templates: {
        Row: {
          id: number
          title: string
          slug: string
          description: string
          price: number
          category_id: number | null
          thumbnail_url: string | null
          preview_url: string | null
          file_url: string | null
          complexity: number | null
          popularity: number | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: number
          title: string
          slug: string
          description: string
          price?: number
          category_id?: number | null
          thumbnail_url?: string | null
          preview_url?: string | null
          file_url?: string | null
          complexity?: number | null
          popularity?: number | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: number
          title?: string
          slug?: string
          description?: string
          price?: number
          category_id?: number | null
          thumbnail_url?: string | null
          preview_url?: string | null
          file_url?: string | null
          complexity?: number | null
          popularity?: number | null
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "templates_category_id_fkey"
            columns: ["category_id"]
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
        ]
      }
      user_prompts: {
        Row: {
          user_id: string
          prompt_id: number
          purchase_id: number | null
          created_at: string
        }
        Insert: {
          user_id: string
          prompt_id: number
          purchase_id?: number | null
          created_at?: string
        }
        Update: {
          user_id?: string
          prompt_id?: number
          purchase_id?: number | null
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_prompts_prompt_id_fkey"
            columns: ["prompt_id"]
            referencedRelation: "prompts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_prompts_purchase_id_fkey"
            columns: ["purchase_id"]
            referencedRelation: "purchases"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_prompts_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
