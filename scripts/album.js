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

	return $(template);
};
// Set album info
var setCurrentAlbum = function (album) {
	var $albumTitle = $('.album-view-title');
	var $albumArtist = $('.album-view-artist');
	var $albumReleaseInfo = $('.album-view-release-info');
	var $albumImage = $('.album-cover-art');
	var $albumSongList = $('.album-view-song-list');
	$albumTitle.text(album.name);
	$albumArtist.text(album.artist);
	$albumReleaseInfo.text(album.year + ' ' + album.label);
	$albumImage.attr('src', album.albumArtUrl);
	$albumSongList.empty();
	for (i = 0; i < album.songs.length; i++) {
		var $newRow = createSongRow(i + 1, album.songs[i].name, album.songs[i].length);
		$albumSongList.append($newRow);
	}
};

// Change play button variables
var songListContainer = document.getElementsByClassName('album-view-song-list')[0];
var songRows = document.getElementsByClassName('album-view-song-item');
var playButtonTemplate = '<a class="album-song-button"><span class="ion-play"></span></a>';
var pauseButtonTemplate = '<a class="album-song-button"><span class="ion-pause"></span></a>';
var currentlyPlayingSong = null;

//Hover to change play button
var playHover = function () {
	songListContainer.addEventListener("mouseover", function (event) {
		if (event.target.parentElement.className === 'album-view-song-item') {
			var songItem = getSongItem(event.target);
			if (songItem.getAttribute('data-song-number') !== currentlyPlayingSong) {
				songItem.innerHTML = playButtonTemplate;
			}
		}
	});
};

//Change back to regular
var playLeave = function () {
	for (i = 0; i < songRows.length; i++) {
		songRows[i].addEventListener("mouseleave", function (event) {
			var songItem = getSongItem(event.target);
			var songItemNumber = songItem.getAttribute('data-song-number');
			if (songItemNumber !== currentlyPlayingSong) {
				songItem.innerHTML = songItemNumber;
			}
		});
		songRows[i].addEventListener('click', function (event) {
			clickHandler(event.target);
		});
	}

};

//Find song-item-number class refactor my solution

// Find song-item-number class bloc solution
var findParentByClassName = function (element, targetClass) {
	var currentParent = element.parentElement;
	if (currentParent) {
		while (currentParent.className && currentParent.className != targetClass) {
			currentParent = currentParent.parentElement;
		}
		if (currentParent == targetClass) {
			return currentParent;
		} else {
			alert("No parent found with that class name")
		}
	} else {
		alert("No parent found")
	}
};
// Return the song item number using the find Parent function
var getSongItem = function (element) {
	switch (element.className) {
	case 'album-song-button':
	case 'ion-play':
	case 'ion-pause':
		return findParentByClassName(element, 'song-item-number');
	case 'album-view-song-item':
		return element.querySelector('.song-item-number');
	case 'song-item-title':
	case 'song-item-duration':
		return findParentByClassName(element, 'album-view-song-item').querySelector('.song-item-number');
	case 'song-item-number':
		return element;
	default:
		return;
	}
};
var clickHandler = function (targetElement) {
	var songItem = getSongItem(targetElement);
	if (currentlyPlayingSong === null) {
		songItem.innerHTML = pauseButtonTemplate;
		currentlyPlayingSong = songItem.getAttribute('data-song-number');
	} else if (currentlyPlayingSong === songItem.getAttribute('data-song-number')) {
		songItem.innerHTML = playButtonTemplate;
		currentlyPlayingSong = null;
	} else if (currentlyPlayingSong !== songItem.getAttribute('data-song-number')) {
		var currentlyPlayingSongElement = document.querySelector('[data-song-number="' + currentlyPlayingSong + '"]');
		currentlyPlayingSongElement.innerHTML = currentlyPlayingSongElement.getAttribute('data-song-number');
		songItem.innerHTML = pauseButtonTemplate;
		currentlyPlayingSong = songItem.getAttribute('data-song-number');
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