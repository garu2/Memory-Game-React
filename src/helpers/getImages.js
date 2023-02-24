
export const getImages = (size) => {
    const images = [
        "/bun.svg",
        "/deno.svg",
        "/docker.svg",
        "/redis.svg",
        "/vitejs.svg",
        "/github.svg",
        "/javascript.svg",
        "/supabase.svg",
        "/svelte.svg",
        "/vscode.svg",
    ]
    
    const newImages = images.slice(0, size);
    //console.log(newImages);
    //console.log(newImages.flatMap(item => [`a|${item}`, `b|${item}`]).sort(() => Math.random()-0.5));

    return newImages.flatMap(item => [`a|${item}`, `b|${item}`]).sort(() => Math.random() - 0.5);
}