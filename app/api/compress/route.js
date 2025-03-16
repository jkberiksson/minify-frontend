export async function POST(req) {
    try {
        const formData = await req.formData();
        const backendUrl = process.env.BACKEND_URL;

        const res = await fetch(`${backendUrl}/upload-video`, {
            method: 'POST',
            body: formData,
        });

        if (!res.ok) {
            throw new Error('Compression failed');
        }

        const blob = await res.blob();
        return new Response(blob);
    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
}
