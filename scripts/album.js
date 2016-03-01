//Create Table with songs
var createSongRow = function (songNumber, songName, songLength) {
	var template =
		'<tr class="album-view-song-item">' + '  <td class="song-item-number" data-song-number="' + songNumber + '">' + songNumber + '</td>' + '  <td class="song-item-title">' + songName + '</td>' + '  <td class="song-item-duration">' + songLength + '</td>' + '</tr>';

	var row = $(template);
	var onHover = function (event) {
		var songNumberCell = $(this).find('.song-item-number');
		//line below
		var songNumber = parseInt(songNumberCell.attr('data-song-number'));

		if (songNumber !== currentlyPlayingSongNumber) {
			songNumberCell.html(playButtonTemplate);
		}
	};

	var offHover = function (event) {
		var songNumberCell = $(this).find('.song-item-number');
		//line below
		var songNumber = parseInt(songNumberCell.attr('data-song-number'));

		if (songNumber !== currentlyPlayingSongNumber) {
			songNumberCell.html(songNumber);
		}
	};
	row.find('.song-item-number').click(clickHandler);
	row.hover(onHover, offHover);
	return row;
};

// Set album info
var setCurrentAlbum = function (album) {
	currentAlbum = album;
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

var trackIndex = function (album, song) {
	return album.songs.indexOf(song);
};

// Change play button variables
var playButtonTemplate = '<a class="album-song-button"><span class="ion-play"></span></a>';
var pauseButtonTemplate = '<a class="album-song-button"><span class="ion-pause"></span></a>';
var playerBarPlayButton = '<span class="ion-play"></span>';
var playerBarPauseButton = '<span class="ion-pause"></span>';

var currentAlbum = null;
var currentlyPlayingSongNumber = null;
var currentSongFromAlbum = null;

var clickHandler = function () {
	//Line below
	var songNumber = parseInt($(this).attr('data-song-number'));
	if (currentlyPlayingSongNumber !== null) {
		var currentlyPlayingCell = $('.song-item-number[data-song-number="' + currentlyPlayingSongNumber + '"]');
		currentSongFromAlbum = $(this).siblings('.song-item-title').text();
		currentlyPlayingCell.html(currentlyPlayingSongNumber);
		updatePlayerBarSong();
	}
	if (currentlyPlayingSongNumber !== songNumber) {
		$(this).html(pauseButtonTemplate);
		//Line below
		currentlyPlayingSongNumber = parseInt(songNumber);
		currentSongFromAlbum = currentAlbum.songs[songNumber - 1];
		updatePlayerBarSong();
	} else if (currentlyPlayingSongNumber === songNumber) {
		$(this).html(playButtonTemplate);
		$('.main-controls .play-pause').html(playerBarPlayButton);
		currentlyPlayingSongNumber = null;
		currentSongFromAlbum = null;
	}

};
// Update player bar
var updatePlayerBarSong = function () {
	$('.currently-playing .song-name').text(currentSongFromAlbum.name);
	$('.currently-playing .artist-name').text(currentAlbum.artist);
	$('.currently-playing .artist-song-mobile').text(currentAlbum.name + " - " + currentAlbum.artist);
	$('.main-controls .play-pause').html(playerBarPauseButton);
};

//previous song function
var previousSong = function () {
	var getLastSongNumber = function (index) {
		return index == (currentAlbum.songs.length - 1) ? 1 : index + 2;
	};

	var currentSongIndex = trackIndex(currentAlbum, currentSongFromAlbum);
	currentSongIndex--;

	if (currentSongIndex < 0) {
		currentSongIndex = currentAlbum.songs.length - 1;
	}

	// Set a new current song
	currentlyPlayingSongNumber = parseInt(currentSongIndex + 1);
	currentSongFromAlbum = currentAlbum.songs[currentSongIndex];

	updatePlayerBarSong();

	var lastSongNumber = getLastSongNumber(currentSongIndex);
	var $previousSongNumberCell = $('.song-item-number[data-song-number="' + currentlyPlayingSongNumber + '"]');
	var $lastSongNumberCell = $('.song-item-number[data-song-number="' + lastSongNumber + '"]');

	$previousSongNumberCell.html(pauseButtonTemplate);
	$lastSongNumberCell.html(lastSongNumber);

};

//Next song function
nextSong = function () {
	var lastSong = function (index) {
		return index == 0 ? currentAlbum.songs.length : index;
	}
	var currentindex = trackIndex(currentAlbum, currentSongFromAlbum);
	currentindex++;

	if (currentindex >= currentAlbum.songs.length) {
		currentindex = 0;
	}
	currentlyPlayingSongNumber = parseInt(currentindex + 1);
	currentSongFromAlbum = currentAlbum.songs[currentindex];

	updatePlayerBarSong();

	var lastSongnumber = lastSong(currentindex);
	var $nextSongNumberCell = $('.song-item-number[data-song-number="' + currentlyPlayingSongNumber + '"]');
	var $lastSongNumberCell = $('.song-item-number[data-song-number="' + lastSongnumber + '"]');
	$nextSongNumberCell.html(pauseButtonTemplate);
	$lastSongNumberCell.html(lastSongnumber);

};

var $previousButton = $('.main-controls .previous');
var $nextButton = $('.main-controls .next');

$(document).ready(function () {
	// Switch album variables
	var albumImage = document.getElementsByClassName('album-cover-art')[0];
	var albums = [albumPicasso, albumKuKaChu, albumMarconi];
	var current = 1;

	// Switch album on click
	setCurrentAlbum(albumPicasso);
	$previousButton.click(previousSong);
	$nextButton.click(nextSong);
	$(albumImage).click(function () {
		setCurrentAlbum(albums[current]);
		current++;

		if (current == albums.length) {
			current = 0;
		}
	});
});