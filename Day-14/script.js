console.log(marked)
const textarea = document.getElementById('markdown-input');
const preview = document.getElementById('preview');

textarea.addEventListener('input', () => {
    const markdownText = textarea.value;
    preview.innerHTML = marked.marked(markdownText);
});
