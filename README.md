**Esercizio**
E’ arrivato il momento di mettere insieme tutti i concetti appresi :arrossire:
Cominciate, installando nel vostro progetto backend (express-blog-api-crud) il pacchetto per gestire le CORS e impostate l'indirizzo del vostro progetto front-end. Ricordate di usare postman per testare le vostre API.
Riprendete l'esercizio precedente (react-form-multifileds) e prima di tutto adeguate i dati stampati e gli inputs del form ai dati che abbiamo nell'api - non tenete conto di tags per oggi (usate Postman per vedere la struttura di dati nel back-end).
A questo punto integriamo le API che abbiamo sviluppato durante il modulo su ExpressJS.
Al caricamento dell'applicazione, sfruttando l'hook useEffect, recuperiamo la lista dei post dal backend e la mostriamo nella pagina.

BONUS (per oggi):
1. Durante il submit del form, assicuriamoci che questi dati vengano inviati al backend e correttamente salvati.
2. Implementare la funzionalità di cancellazione

////////////////////////

**Esercizio**
Completare l'esercizio di ieri, aggiungendo l'invio di dati del form all'API (senza tag).
Implementare funzione di cancellazione del post.
Bonus:
1. Creare componente card per il post
2. Aggiungere la possibilità di selezionare i tag nel form:
Nel caso avevate implementato l'endpoint API per i tag, fate la chiamata axios per avere elenco di tag. Altrimenti create array di tag statico nel progetto react js.
3. Aggiungere la possibilità di filtrare i post per i tag (nel caso l'avevi implementato in BE)