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

	var row = template;
	var onHover = function (event) {
		alert("What?");
		var songNumberCell = $(this).find('.song-item-number');
		var songNumber = songNumberCell.attr('data-song-number');

		if (songNumber !== currentlyPlayingSong) {
			songNumberCell.html(playButtonTemplate);
		}
	};

	var offHover = function (event) {
		alert("hello");
		var songNumberCell = $(this).find('.song-item-number');
		var songNumber = songNumberCell.attr('data-song-number');

		if (songNumber !== currentlyPlayingSong) {
			songNumberCell.html(songNumber);
		}
	};
	$(row).find('.song-item-number').click(clickHandler);
	$(row).hover(onHover, offHover);
	return $(row);
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
/*var songListContainer = $('.album-view-song-list');
var songRows = $('.album-view-song-item');*/
var playButtonTemplate = '<a class="album-song-button"><span class="ion-play"></span></a>';
var pauseButtonTemplate = '<a class="album-song-button"><span class="ion-pause"></span></a>';
var currentlyPlayingSong = null;

/*Hover to change play button
var playHover = function () {
	songListContainer.mouseover(function (event) {
		if ($(this).parents('.album-view-song-item')) {
			//alert(songItem);
			var songItem = $row.find('.song-item-number');
			alert(songItem);
			if (songItem.attr('data-song-number') !== currentlyPlayingSong) {
				songItem.innerHTML = playButtonTemplate;
			}
		}
	});
};

Change back to regular
var playLeave = function () {
	for (i = 0; i < songRows.length; i++) {
		songRows[i].mouseleave(function (event) {
			var songItem = getSongItem(event.target);
			var songItemNumber = songItem.attr('data-song-number');
			if (songItemNumber !== currentlyPlayingSong) {
				songItem.innerHTML = songItemNumber;
			}
		});
		songRows[i].click(function (event) {
			clickHandler(event.target);
		});
	}
};

Find song-item-number class bloc solution
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
		return (element).parents('.song-item-number');
	case 'album-view-song-item':
		return element.querySelector('.song-item-number');
	case 'song-item-title':
	case 'song-item-duration':
		return (element).parents('.album-view-song-item').querySelector('.song-item-number');
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
		currentlyPlayingSong = songItem.attr('data-song-number');
	} else if (currentlyPlayingSong === songItem.attr('data-song-number')) {
		songItem.innerHTML = playButtonTemplate;
		currentlyPlayingSong = null;
	} else if (currentlyPlayingSong !== songItem.attr('data-song-number')) {
		var currentlyPlayingSongElement = document.querySelector('[data-song-number="' + currentlyPlayingSong + '"]');
		currentlyPlayingSongElement.innerHTML = currentlyPlayingSongElement.getAttribute('data-song-number');
		songItem.innerHTML = pauseButtonTemplate;
		currentlyPlayingSong = songItem.getAttribute('data-song-number');
	}
};*/
var clickHandler = function () {
	var songNumber = $(this).attr('data-song-number');

	if (currentlyPlayingSong !== null) {
		// Revert to song number for currently playing song because user started playing new song.
		var currentlyPlayingCell = $('.song-item-number[data-song-number="' + currentlyPlayingSong + '"]');
		currentlyPlayingCell.html(currentlyPlayingSong);
	}
	if (currentlyPlayingSong !== songNumber) {
		// Switch from Play -> Pause button to indicate new song is playing.
		$(this).html(pauseButtonTemplate);
		currentlyPlayingSong = songNumber;
	} else if (currentlyPlayingSong === songNumber) {
		// Switch from Pause -> Play button to pause currently playing song.
		$(this).html(playButtonTemplate);
		currentlyPlayingSong = null;
	}
};

$(document).ready(function () {
	// Switch album variables
	var albumImage = document.getElementsByClassName('album-cover-art')[0];
	var albums = [albumPicasso, albumKuKaChu, albumMarconi];
	var current = 1;

	// Switch album on click
	setCurrentAlbum(albumPicasso);
	$(albumImage).click(function () {
		setCurrentAlbum(albums[current]);
		current++;
		playLeave();
		if (current == albums.length) {
			current = 0;
		}
	});
	//playHover();
	//playLeave();
});