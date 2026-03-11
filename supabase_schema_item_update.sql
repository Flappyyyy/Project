-- Run this snippet in your Supabase SQL Editor to support the new item checklist function!

ALTER TABLE public.clients ADD COLUMN "isItemReceived" boolean DEFAULT false;
