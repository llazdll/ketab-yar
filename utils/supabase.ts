import { auth } from '@/auth';
import { createClient } from '@supabase/supabase-js';

const bucket = 'main-bucket';
export const supabase = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_KEY!
);
export const uploadImage = async (image: File, userId: string): Promise<string> => {
    const user = await auth();
    try {
        const timestamp = Date.now();
        const extension = image.name.split('.').pop();
        const newName = `books/${user?.user?.id}-${timestamp}.${extension}`;

        const { error: uploadError } = await supabase.storage
            .from(bucket)
            .upload(newName, image, {
                cacheControl: '3600',
                upsert: false,
                contentType: image.type
            });

        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage
            .from(bucket)
            .getPublicUrl(newName);

        return publicUrl;
    } catch (error) {
        console.error('Image upload failed:', error);
        throw new Error('آپلود تصویر ناموفق بود');
    }
};

export const deleteImage = async (url: string): Promise<void> => {
    try {
        const path = url.split(`${bucket}/`)[1];
        const { error } = await supabase.storage
            .from(bucket)
            .remove([path]);

        if (error) throw error;
    } catch (error) {
        console.error('Image deletion failed:', error);
        throw new Error('حذف تصویر ناموفق بود');
    }
};