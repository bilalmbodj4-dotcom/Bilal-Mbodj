import { Word } from '../types';

export const MOCK_WORDS: Word[] = [
  {
    id: '1',
    term: 'Rêverie',
    phonetic: '/ʁɛ.və.ʁi/',
    type: 'n.f.',
    definition: 'Activité de l\'esprit qui s\'abandonne à des pensées vagues, à des images agréables.',
    translation: 'Daydream; pleasant thoughts or musings.',
    exampleFr: 'Elle est perdue dans une douce rêverie.',
    exampleEn: 'She is lost in a sweet daydream.',
  },
  {
    id: '2',
    term: 'Délicieux',
    phonetic: '/de.li.sjø/',
    type: 'adj.',
    definition: 'Qui a une saveur très agréable au goût, qui flatte le palais.',
    translation: 'Delicious; very pleasant to the taste.',
    exampleFr: 'Ce gâteau au chocolat est délicieux.',
    exampleEn: 'This chocolate cake is delicious.',
  },
  {
    id: '3',
    term: 'Épanouissement',
    phonetic: '/e.pa.nu.is.mɑ̃/',
    type: 'n.m.',
    definition: 'Action de s\'épanouir, de se développer pleinement.',
    translation: 'Blooming, fulfillment.',
    exampleFr: 'Le jardin est en plein épanouissement au printemps.',
    exampleEn: 'The garden is in full bloom in spring.',
  },
  {
    id: '4',
    term: 'Dépaysement',
    phonetic: '/de.pe.iz.mɑ̃/',
    type: 'n.m.',
    definition: 'État d\'une personne qui se trouve dans un milieu inconnu, étranger.',
    translation: 'Change of scene, culture shock.',
    exampleFr: 'Voyager apporte un vrai dépaysement.',
    exampleEn: 'Traveling brings a real change of scene.',
  },
  {
    id: '5',
    term: 'Flâner',
    phonetic: '/flɑ.ne/',
    type: 'v.',
    definition: 'Se promener sans but précis, au hasard.',
    translation: 'To stroll, wander.',
    exampleFr: 'J\'aime flâner dans les rues de Paris.',
    exampleEn: 'I love to stroll through the streets of Paris.',
  },
  {
    id: '6',
    term: 'Chuchoter',
    phonetic: '/ʃy.ʃɔ.te/',
    type: 'v.',
    definition: 'Parler à voix basse, à l\'oreille de quelqu\'un.',
    translation: 'To whisper.',
    exampleFr: 'Il s\'est penché pour chuchoter à son oreille.',
    exampleEn: 'He leaned in to whisper in her ear.',
  }
];

export const RECENT_SEARCHES = ['Boulangerie', 'Amour', 'Courage', 'Liberté'];
