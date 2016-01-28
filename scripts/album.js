//Album 1
var albumPicasso = {
	name: 'The Colors',
	artist: 'Pablo Picasso',
	label: 'Cubism',
	year: '1881',
	albumArtUrl: 'assets/images/album_covers/01.png',
	songs: [
		{
			name: 'Blue',
			length: '4:26'
		},
		{
			name: 'Green',
			length: '3:14'
		},
		{
			name: 'Red',
			length: '5:01'
		},
		{
			name: 'Pink',
			length: '3:21'
		},
		{
			name: 'Magenta',
			length: '2:15'
		}
     ]
};
//Album 2 
var albumMarconi = {
	name: 'The Telephone',
	artist: 'Guglielmo Marconi',
	label: 'EM',
	year: '1909',
	albumArtUrl: 'assets/images/album_covers/20.png',
	songs: [
		{
			name: 'Hello, Operator?',
			length: '1:01'
		},
		{
			name: 'Ring, ring, ring',
			length: '5:01'
		},
		{
			name: 'Fits in your pocket',
			length: '3:21'
		},
		{
			name: 'Can you hear me now?',
			length: '3:14'
		},
		{
			name: 'Wrong phone number',
			length: '2:15'
		}
     ]
};
//Album 3
var albumKuKaChu = {
	name: 'KuKaChu',
	artist: 'KuKa Chuuu',
	label: 'JB',
	year: '1999',
	albumArtUrl: 'assets/images/album_covers/20.png',
	songs: [
		{
			name: 'Divided we stand',
			length: '3:40'
		},
		{
			name: 'Can\'t believe that',
			length: '4:12'
		},
		{
			name: 'Bogus',
			length: '1:20'
		},

	]
};
//Create Table with songs
var createSongRow = function (songNumber, songName, songLength) {
	var template =
		'<tr class="album-view-song-item">' + '  <td class="song-item-number" data-song-number="' + songNumber + '">' + songNumber + '</td>' + '  <td class="song-item-title">' + songName + '</td>' + '  <td class="song-item-duration">' + songLength + '</td>' + '</tr>';

	return template;
};
// Set album info
var setCurrentAlbum = function (album) {
	var albumTitle = document.getElementsByClassName('album-view-title')[0];
	var albumArtist = document.getElementsByClassName('album-view-artist')[0];
	var albumReleaseInfo = document.getElementsByClassName('album-view-release-info')[0];
	var albumImage = document.getElementsByClassName('album-cover-art')[0];
	var albumSongList = document.getElementsByClassName('album-view-song-list')[0];
	albumTitle.firstChild.nodeValue = album.name;
	albumArtist.firstChild.nodeValue = album.artist;
	albumReleaseInfo.firstChild.nodeValue = album.year + ' ' + album.label;
	albumImage.setAttribute('src', album.albumArtUrl);
	albumSongList.innerHTML = '';
	for (i = 0; i < album.songs.length; i++) {
		albumSongList.innerHTML += createSongRow(i + 1, album.songs[i].name, album.songs[i].length);
	}
};

// Change play button variables
var songListContainer = document.getElementsByClassName('album-view-song-list')[0];
var songRows = document.getElementsByClassName('album-view-song-item');
var playButtonTemplate = '<a class="album-song-button"><span class="ion-play"></span></a>';

//Hover to change play button
var playHover = function () {
	songListContainer.addEventListener("mouseover", function (event) {
		if (event.target.parentElement.className === 'album-view-song-item') {
			event.target.parentElement.querySelector('.song-item-number').innerHTML = playButtonTemplate;
		}
	});
};

//Change back to regular
var playLeave = function () {
	for (i = 0; i < songRows.length; i++) {
		songRows[i].addEventListener("mouseleave", function (event) {
			this.children[0].innerHTML = this.children[0].getAttribute('data-song-number');
		});
	}
};


window.onload = function () {
	// Switch album variables
	var albumImage = document.getElementsByClassName('album-cover-art')[0];
	var albums = [albumPicasso, albumKuKaChu, albumMarconi];
	var current = 1;
	
	// Switch album on click
	setCurrentAlbum(albumPicasso);
	albumImage.addEventListener("click", function () {
		setCurrentAlbum(albums[current]);
		current++;
		playLeave();
		if (current == albums.length) {
			current = 0;
		}
	});
	playHover();
	playLeave();
};