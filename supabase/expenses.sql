-- 1. Tạo bảng expenses với các ràng buộc dữ liệu chuẩn theo đề bài
CREATE TABLE expenses (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  amount NUMERIC(10, 2) NOT NULL,
  category TEXT NOT NULL,
  spent_on DATE NOT NULL,
  note TEXT DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT NOW(),

  -- Ràng buộc từ chối dữ liệu sai tại tầng Database
  CONSTRAINT check_amount_positive CHECK (amount > 0),
  CONSTRAINT check_category_valid CHECK (category IN ('Food', 'Transport', 'Shopping', 'Bills', 'Other')),
  CONSTRAINT check_note_length CHECK (char_length(note) <= 100)
);

-- 2. Bật bảo mật Row Level Security (RLS)
ALTER TABLE expenses ENABLE ROW LEVEL SECURITY;

-- 3. Tạo các chính sách bảo mật: người dùng chỉ xem, thêm, xóa dữ liệu của chính mình
CREATE POLICY "Users can read own expenses" 
ON expenses FOR SELECT 
TO authenticated 
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own expenses" 
ON expenses FOR INSERT 
TO authenticated 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own expenses" 
ON expenses FOR DELETE 
TO authenticated 
USING (auth.uid() = user_id);