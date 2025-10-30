const axios = require('axios');

const BASE_URL = 'http://localhost:8005/api/articles';

const articles = [
  {
    titre: "Introduction à JavaScript Moderne",
    contenu: "JavaScript est un langage de programmation essentiel pour le développement web. Depuis son introduction en 1995, il a évolué considérablement avec l'arrivée d'ES6 et des nouvelles fonctionnalités modernes.",
    auteur: "Marie Dupont",
    categorie: "technologie"
  },
  {
    titre: "Les élections présidentielles de 2024",
    contenu: "Les élections présidentielles françaises de 2024 ont été marquées par une participation record. Les enjeux climatiques et économiques ont dominé la campagne électorale.",
    auteur: "Jean Martin",
    categorie: "politique"
  },
  {
    titre: "Le football français en crise",
    contenu: "Le championnat de France de football traverse une période difficile. Les clubs français peinent à rivaliser avec les meilleures équipes européennes malgré des investissements importants.",
    auteur: "Pierre Dubois",
    categorie: "sport"
  },
  {
    titre: "L'économie numérique en 2024",
    contenu: "L'économie numérique représente désormais plus de 10% du PIB mondial. Les startups technologiques continuent de transformer les secteurs traditionnels avec des innovations disruptives.",
    auteur: "Sophie Leroy",
    categorie: "economie"
  },
  {
    titre: "Festival de Cannes 2024 : Palmarès complet",
    contenu: "Le 77ème Festival de Cannes s'est achevé avec la consécration du film 'La Chambre des merveilles' qui a remporté la Palme d'Or. Une édition marquée par la diversité et l'innovation cinématographique.",
    auteur: "Anne Moreau",
    categorie: "culture"
  },
  {
    titre: "Développement durable : Les entreprises s'engagent",
    contenu: "De plus en plus d'entreprises adoptent des stratégies de développement durable. La transition énergétique et la réduction des émissions de CO2 deviennent des priorités stratégiques.",
    auteur: "Luc Bernard",
    categorie: "economie"
  },
  {
    titre: "Intelligence Artificielle : Révolution ou menace ?",
    contenu: "L'intelligence artificielle transforme notre société à une vitesse exponentielle. Alors que certains y voient une révolution technologique, d'autres s'inquiètent de ses impacts sur l'emploi et la société.",
    auteur: "Claire Petit",
    categorie: "technologie"
  },
  {
    titre: "Les Jeux Olympiques de Paris 2024",
    contenu: "Les Jeux Olympiques et Paralympiques de Paris 2024 ont été un succès retentissant. Plus de 10 millions de visiteurs ont assisté aux compétitions dans la capitale française.",
    auteur: "Marc Durand",
    categorie: "sport"
  },
  {
    titre: "Crise politique en Europe centrale",
    contenu: "L'Europe centrale fait face à une instabilité politique croissante. Les tensions géopolitiques et les enjeux migratoires dominent l'agenda politique de plusieurs pays.",
    auteur: "François Roux",
    categorie: "politique"
  },
  {
    titre: "Le streaming révolutionne l'industrie musicale",
    contenu: "Les plateformes de streaming ont transformé l'industrie musicale. Les artistes indépendants peuvent désormais toucher un public mondial sans passer par les maisons de disques traditionnelles.",
    auteur: "Isabelle Garnier",
    categorie: "culture"
  },
  {
    titre: "React.js : Framework JavaScript populaire",
    contenu: "React.js continue de dominer le marché des frameworks JavaScript. Sa flexibilité et sa communauté active en font un choix privilégié pour les développeurs frontend modernes.",
    auteur: "Thomas Moreau",
    categorie: "technologie"
  },
  {
    titre: "Inflation et pouvoir d'achat en France",
    contenu: "L'inflation atteint des niveaux record en France. Les ménages français ressentent de plus en plus la pression sur leur pouvoir d'achat malgré les mesures gouvernementales.",
    auteur: "Valérie Lefebvre",
    categorie: "economie"
  },
  {
    titre: "Championnat du monde de rugby 2023",
    contenu: "L'Afrique du Sud a remporté le Rugby World Cup 2023 face à la Nouvelle-Zélande. Une finale épique qui a tenu en haleine des millions de spectateurs à travers le monde.",
    auteur: "Philippe Girard",
    categorie: "sport"
  },
  {
    titre: "Littérature française contemporaine",
    contenu: "La littérature française continue d'innover avec de nouveaux talents. Les thèmes de l'identité, de l'immigration et des transformations sociales dominent les œuvres actuelles.",
    auteur: "Catherine Michel",
    categorie: "culture"
  },
  {
    titre: "Blockchain et cryptomonnaies",
    contenu: "La blockchain et les cryptomonnaies représentent l'avenir de la finance décentralisée. Malgré la volatilité, ces technologies ouvrent de nouvelles perspectives pour les transactions internationales.",
    auteur: "Nicolas Fournier",
    categorie: "technologie"
  },
  {
    titre: "Réforme des retraites : Débat houleux",
    contenu: "La réforme des retraites divise profondément la classe politique française. Les syndicats et l'opposition dénoncent une atteinte aux droits sociaux des travailleurs.",
    auteur: "Émilie Rousseau",
    categorie: "politique"
  },
  {
    titre: "Tennis : Djokovic égale le record de Grand Chelem",
    contenu: "Novak Djokovic a remporté son 24ème titre du Grand Chelem à l'US Open 2023. Le Serbe égale désormais le record absolu de titres majeurs détenu par Margaret Court.",
    auteur: "Antoine Lambert",
    categorie: "sport"
  },
  {
    titre: "Musée du Louvre : Nouvelles acquisitions",
    contenu: "Le musée du Louvre a annoncé l'acquisition de plusieurs œuvres majeures. Ces nouvelles pièces enrichissent considérablement les collections permanentes du musée.",
    auteur: "Marie-Claire André",
    categorie: "culture"
  },
  {
    titre: "Développement mobile avec Flutter",
    contenu: "Flutter de Google permet de développer des applications mobiles natives pour iOS et Android avec un seul code source. Cette approche cross-platform gagne en popularité.",
    auteur: "David Chen",
    categorie: "technologie"
  },
  {
    titre: "Commerce international en évolution",
    contenu: "Le commerce international subit de profonds changements avec l'émergence de nouvelles routes commerciales. L'Asie devient le centre névralgique des échanges mondiaux.",
    auteur: "Julie Martinez",
    categorie: "economie"
  },
  {
    titre: "Formule 1 : Saison 2024 prometteuse",
    contenu: "La saison 2024 de Formule 1 s'annonce exceptionnelle avec de nouveaux règlements techniques. Les équipes se préparent pour une bataille acharnée sur les circuits.",
    auteur: "Romain Dubois",
    categorie: "sport"
  },
  {
    titre: "Cinéma indépendant français",
    contenu: "Le cinéma indépendant français vit une renaissance remarquable. De nouveaux réalisateurs talentueux émergent et proposent des visions originales du cinéma français.",
    auteur: "Laurence Perrin",
    categorie: "culture"
  },
  {
    titre: "Cloud computing : L'avenir de l'informatique",
    contenu: "Le cloud computing transforme radicalement l'informatique d'entreprise. Les solutions de cloud offrent flexibilité, scalabilité et réduction des coûts opérationnels.",
    auteur: "Alexandre Girard",
    categorie: "technologie"
  },
  {
    titre: "Politique environnementale européenne",
    contenu: "L'Union Européenne intensifie sa politique environnementale. Le Green Deal européen vise à atteindre la neutralité carbone d'ici 2050 malgré les résistances de certains secteurs.",
    auteur: "Sarah Lefèvre",
    categorie: "politique"
  },
  {
    titre: "Basketball NBA : Les Lakers renaissent",
    contenu: "Les Los Angeles Lakers connaissent une renaissance remarquable en NBA. Avec de jeunes talents et une stratégie gagnante, l'équipe vise le titre suprême.",
    auteur: "Kevin Moreau",
    categorie: "sport"
  },
  {
    titre: "Art contemporain : Tendances actuelles",
    contenu: "L'art contemporain explore de nouveaux territoires avec le numérique et l'interactivité. Les artistes repoussent les limites traditionnelles de l'expression artistique.",
    auteur: "Élodie Blanc",
    categorie: "culture"
  },
  {
    titre: "Big Data et analyse prédictive",
    contenu: "Le Big Data révolutionne la prise de décision dans les entreprises. L'analyse prédictive permet d'anticiper les tendances et d'optimiser les stratégies commerciales.",
    auteur: "Mathieu Roux",
    categorie: "technologie"
  },
  {
    titre: "Marché immobilier français",
    contenu: "Le marché immobilier français montre des signes de stabilisation. Les prix commencent à se stabiliser après plusieurs années de forte inflation immobilière.",
    auteur: "Camille Dupont",
    categorie: "economie"
  },
  {
    titre: "Cyclisme : Tour de France 2024",
    contenu: "Le Tour de France 2024 a été remporté par Tadej Pogacar. Le Slovène a dominé la course avec une avance confortable sur ses concurrents.",
    auteur: "Julien Leroy",
    categorie: "sport"
  },
  {
    titre: "Théâtre français moderne",
    contenu: "Le théâtre français contemporain innove avec des formes hybrides mêlant texte, danse et multimédia. Les metteurs en scène explorent de nouveaux langages scéniques.",
    auteur: "Sylvie Garnier",
    categorie: "culture"
  },
  {
    titre: "Machine Learning appliqué",
    contenu: "Le Machine Learning trouve des applications concrètes dans de nombreux domaines. De la reconnaissance d'images à la prédiction médicale, les possibilités sont infinies.",
    auteur: "Lucas Bernard",
    categorie: "technologie"
  },
  {
    titre: "Commerce électronique en expansion",
    contenu: "Le e-commerce continue sa croissance exponentielle. Les consommateurs privilégient de plus en plus les achats en ligne pour leur praticité et leur diversité.",
    auteur: "Nathalie Petit",
    categorie: "economie"
  },
  {
    titre: "Golf : Masters d'Augusta 2024",
    contenu: "Scottie Scheffler a remporté le Masters d'Augusta 2024. L'Américain confirme sa domination sur le circuit professionnel de golf.",
    auteur: "Vincent Durand",
    categorie: "sport"
  },
  {
    titre: "Littérature jeunesse innovante",
    contenu: "La littérature jeunesse évolue avec des thèmes contemporains et des formats innovants. Les jeunes auteurs proposent des récits engageants et modernes.",
    auteur: "Hélène Moreau",
    categorie: "culture"
  },
  {
    titre: "Cybersécurité : Menaces croissantes",
    contenu: "La cybersécurité devient une priorité absolue pour les entreprises. Les cyberattaques sophistiquées nécessitent des défenses de plus en plus élaborées.",
    auteur: "Olivier Chen",
    categorie: "technologie"
  },
  {
    titre: "Politique agricole commune réformée",
    contenu: "La réforme de la Politique Agricole Commune vise à soutenir l'agriculture durable. Les agriculteurs européens s'adaptent à de nouveaux défis environnementaux.",
    auteur: "Agnès Roux",
    categorie: "politique"
  },
  {
    titre: "Natation : Championnats du monde 2024",
    contenu: "Les championnats du monde de natation 2024 ont été dominés par les nageurs australiens. Plusieurs records du monde ont été battus lors de cette compétition.",
    auteur: "Benoît Fournier",
    categorie: "sport"
  },
  {
    titre: "Photographie contemporaine",
    contenu: "La photographie contemporaine explore de nouveaux territoires avec le numérique. Les photographes repoussent les limites de l'image et de la narration visuelle.",
    auteur: "Isabelle Lambert",
    categorie: "culture"
  },
  {
    titre: "5G : Révolution des télécommunications",
    contenu: "La 5G transforme les télécommunications avec des débits ultra-rapides. Cette technologie ouvre de nouvelles perspectives pour l'IoT et les services connectés.",
    auteur: "Maxime Girard",
    categorie: "technologie"
  },
  {
    titre: "Marché du travail en mutation",
    contenu: "Le marché du travail évolue rapidement avec la digitalisation. Les compétences techniques deviennent essentielles dans un environnement professionnel en constante évolution.",
    auteur: "Caroline Lefebvre",
    categorie: "economie"
  },
  {
    titre: "Handball : Équipe de France victorieuse",
    contenu: "L'équipe de France de handball a remporté le championnat d'Europe 2024. Les Experts confirment leur domination sur la scène internationale.",
    auteur: "Thomas André",
    categorie: "sport"
  },
  {
    titre: "Musique électronique française",
    contenu: "La musique électronique française rayonne internationalement. De nouveaux artistes émergent et proposent des sonorités innovantes et originales.",
    auteur: "Julie Rousseau",
    categorie: "culture"
  },
  {
    titre: "Internet des objets (IoT)",
    contenu: "L'IoT transforme notre quotidien avec des objets connectés intelligents. Les applications domestiques et industrielles se multiplient rapidement.",
    auteur: "Pierre Michel",
    categorie: "technologie"
  },
  {
    titre: "Diplomatie internationale tendue",
    contenu: "La diplomatie internationale traverse une période de tensions accrues. Les conflits géopolitiques complexes nécessitent des approches diplomatiques innovantes.",
    auteur: "Martine Blanc",
    categorie: "politique"
  },
  {
    titre: "Voile : Vendée Globe 2024",
    contenu: "Le Vendée Globe 2024 a été remporté par Yannick Bestaven. Cette course autour du monde en solitaire confirme le niveau élevé de la voile française.",
    auteur: "Frédéric Durand",
    categorie: "sport"
  },
  {
    titre: "Architecture moderne française",
    contenu: "L'architecture française contemporaine se distingue par son audace et son innovation. Les architectes français repoussent les limites des formes et des matériaux.",
    auteur: "Sophie Garnier",
    categorie: "culture"
  },
  {
    titre: "Réalité virtuelle et augmentée",
    contenu: "La réalité virtuelle et augmentée trouvent des applications concrètes dans l'éducation et la formation. Ces technologies transforment l'apprentissage traditionnel.",
    auteur: "Guillaume Petit",
    categorie: "technologie"
  },
  {
    titre: "Investissement durable",
    contenu: "L'investissement durable gagne du terrain auprès des particuliers et des institutions. Les critères ESG deviennent essentiels dans les stratégies d'investissement.",
    auteur: "Anne-Sophie Bernard",
    categorie: "economie"
  },
  {
    titre: "Equitation : Jeux équestres mondiaux",
    contenu: "Les Jeux équestres mondiaux 2024 ont rassemblé les meilleurs cavaliers mondiaux. Cette compétition multisports équestre confirme l'importance de l'équitation internationale.",
    auteur: "Marie Leroy",
    categorie: "sport"
  },
  {
    titre: "Danse contemporaine française",
    contenu: "La danse contemporaine française évolue avec des chorégraphes innovants. Les compagnies françaises exportent leur savoir-faire à travers le monde.",
    auteur: "Nicolas Perrin",
    categorie: "culture"
  },
  {
    titre: "Développement web avec Node.js",
    contenu: "Node.js révolutionne le développement web côté serveur. Cette plateforme JavaScript permet de créer des applications scalables et performantes.",
    auteur: "Alice Chen",
    categorie: "technologie"
  },
  {
    titre: "Entrepreneuriat social",
    contenu: "L'entrepreneuriat social gagne en importance avec des modèles économiques responsables. Les entreprises sociales répondent à des besoins sociétaux essentiels.",
    auteur: "Marc Dubois",
    categorie: "economie"
  },
  {
    titre: "Athlétisme : Mondiaux 2024",
    contenu: "Les championnats du monde d'athlétisme 2024 ont été marqués par plusieurs records. Les athlètes kényans et jamaïcains ont dominé les épreuves.",
    auteur: "Christine Moreau",
    categorie: "sport"
  },
  {
    titre: "Arts plastiques numériques",
    contenu: "Les arts plastiques intègrent le numérique avec l'art génératif et interactif. Les artistes explorent de nouvelles formes d'expression créative.",
    auteur: "David Roux",
    categorie: "culture"
  },
  {
    titre: "Robotique industrielle avancée",
    contenu: "La robotique industrielle transforme les chaînes de production. Les robots collaboratifs travaillent désormais aux côtés des opérateurs humains.",
    auteur: "Éric Fournier",
    categorie: "technologie"
  },
  {
    titre: "Politique fiscale européenne",
    contenu: "L'harmonisation fiscale en Europe progresse lentement. Les États membres peinent à s'accorder sur des règles communes pour une fiscalité plus équitable.",
    auteur: "Patricia Girard",
    categorie: "politique"
  },
  {
    titre: "Ski alpin : Coupe du monde 2024",
    contenu: "La Coupe du monde de ski alpin 2024 a été dominée par les skieurs norvégiens et suisses. Plusieurs jeunes talents ont émergé cette saison.",
    auteur: "Laurent Bernard",
    categorie: "sport"
  },
  {
    titre: "Littérature fantastique française",
    contenu: "La littérature fantastique française vit un âge d'or avec de nouveaux auteurs talentueux. Les thèmes de la fantasy et de la science-fiction séduisent un public croissant.",
    auteur: "Véronique Petit",
    categorie: "culture"
  },
  {
    titre: "Data Science et analyse de données",
    contenu: "La data science devient indispensable dans toutes les industries. Les scientifiques des données transforment les données brutes en insights stratégiques.",
    auteur: "Stéphane Michel",
    categorie: "technologie"
  },
  {
    titre: "Économie circulaire en entreprise",
    contenu: "L'économie circulaire gagne du terrain dans les stratégies d'entreprise. Réduire, réutiliser, recycler deviennent les maîtres mots d'une économie responsable.",
    auteur: "Isabelle Durand",
    categorie: "economie"
  }
];

async function populateArticles() {
  console.log('🚀 Starting to populate database with 60 articles...');

  let successCount = 0;
  let errorCount = 0;

  for (let i = 0; i < articles.length; i++) {
    try {
      const response = await axios.post(BASE_URL, articles[i], {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.status === 201) {
        successCount++;
        console.log(`✅ Article ${i + 1}/60: "${articles[i].titre}" created successfully`);
      }
    } catch (error) {
      errorCount++;
      console.error(`❌ Article ${i + 1}/60: "${articles[i].titre}" failed - ${error.response?.data?.message || error.message}`);
    }

    // Small delay to avoid overwhelming the server
    await new Promise(resolve => setTimeout(resolve, 100));
  }

  console.log('\n📊 Population Summary:');
  console.log(`✅ Successfully created: ${successCount} articles`);
  console.log(`❌ Failed to create: ${errorCount} articles`);
  console.log(`📈 Total processed: ${successCount + errorCount} articles`);

  if (successCount === articles.length) {
    console.log('🎉 All articles created successfully!');
  } else {
    console.log('⚠️  Some articles failed to create. Check the errors above.');
  }
}

// Check if server is running before starting
async function checkServer() {
  try {
    await axios.get('http://localhost:8005/api/articles');
    console.log('✅ Server is running and accessible');
    return true;
  } catch (error) {
    console.error('❌ Server is not running or not accessible at http://localhost:8005');
    console.error('Please start your server first with: npm start or npm run dev');
    return false;
  }
}

// Run the population script
async function main() {
  console.log('🔍 Checking server connection...');
  const serverRunning = await checkServer();

  if (!serverRunning) {
    process.exit(1);
  }

  await populateArticles();
}

main().catch(error => {
  console.error('💥 Unexpected error:', error.message);
  process.exit(1);
});
