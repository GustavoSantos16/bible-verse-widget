 // Função para buscar e processar o XML
 async function fetchAndProcessXML() {
    try {
        const response = await fetch('https://bible-verse-widget.netlify.app/bible.xml');
        const xmlText = await response.text();
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xmlText, 'application/xml');
  
        // Extrair livros
        const books = Array.from(xmlDoc.getElementsByTagName('book'));
  
        // Escolher um livro aleatório
        const randomBook = books[Math.floor(Math.random() * books.length)];
        const bookId = randomBook.getAttribute('id');
        const bookName = randomBook.getElementsByTagName('h')
        
        
        // Extrair capítulos
        const chapters = Array.from(randomBook.getElementsByTagName('c'));
        
        if (chapters.length > 0) {
            // Escolher um capítulo aleatório
            const randomChapter = chapters[Math.floor(Math.random() * chapters.length)];
            const chapterId = randomChapter.getAttribute('id');
            
            // Encontrar versículos associados ao capítulo
            let verses = [];
            let sibling = randomChapter.nextElementSibling;
            while (sibling && sibling.tagName !== 'c') {
                if (sibling.tagName === 'v') {
                    verses.push(sibling);
                }
                sibling = sibling.nextElementSibling;
            }
            console.log(sibling)
            
            if (verses.length > 0) {
                // Escolher um versículo aleatório
                const randomVerse = verses[Math.floor(Math.random() * verses.length)];
                const verseId = randomVerse.getAttribute('id');
                const verseText = randomVerse.nextSibling.data;
  
                // Atualizar o HTML com o livro, capítulo e versículo aleatório
                document.getElementById('book-chapter').innerText = `${bookName[0].innerHTML} ${chapterId} : ${verseId}`;
                document.getElementById('verse').innerText = verseText;
            } else {
                document.getElementById('verse').innerText = 'Nenhum versículo encontrado.';
            }
        } else {
            document.getElementById('verse').innerText = 'Nenhum capítulo encontrado.';
        }
    } catch (error) {
        console.error('Erro ao buscar ou processar o XML:', error);
        document.getElementById('verse').innerText = 'Erro ao carregar o versículo.';
    }
  }
  
  // Chamar a função ao carregar a página
  fetchAndProcessXML();