const Manifest= require('./src/js/manifest');

let manifest=new Manifest('./manifest');
manifest.createEntry(1,[123,15,213]);
manifest.addArtifactsToEntry(2,[1,2,3,4,5,6,7,8,9])
//manifest.removeArtifactsFromEntry(2,[2,4]);
