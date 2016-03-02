var currentAlbum = null;
var currentlyPlayingSongNumber = null;
var currentSongFromAlbum = null;
var currentSoundFile = null;
var currentVolume = 80;

//Create Table with songs
var createSongRow = function (songNumber, songName, songLength) {
	var template =
		'<tr class="album-view-song-item">' + '  <td class="song-item-number" data-song-number="' + songNumber + '">' + songNumber + '</td>' + '  <td class="song-item-title">' + songName + '</td>' + '  <td class="song-item-duration">' + songLength + '</td>' + '</tr>';

	var row = $(template);
	var onHover = function (event) {
		var songNumberCell = $(this).find('.song-item-number');
		var songNumber = parseInt(songNumberCell.attr('data-song-number'));

		if (songNumber !== currentlyPlayingSongNumber) {
			songNumberCell.html(playButtonTemplate);
		}
	};

	var offHover = function (event) {
		var songNumberCell = $(this).find('.song-item-number');
		var songNumber = parseInt(songNumberCell.attr('data-song-number'));

		if (songNumber !== currentlyPlayingSongNumber) {
			songNumberCell.html(songNumber);
		}
	};
	row.find('.song-item-number').click(clickHandler);
	row.hover(onHover, offHover);
	return row;
};

//Set song function
var setSong = function (songNumber) {
	if (currentSoundFile) {
		currentSoundFile.stop();
	}
	currentlyPlayingSongNumber = parseInt(songNumber);
	currentSongFromAlbum = currentAlbum.songs[songNumber - 1];
	currentSoundFile = new buzz.sound(currentSongFromAlbum.audioUrl, {
		formats: ['mp3'],
		preload: true
	});
	setVolume(currentVolume);
};
//Seek to part of a song
 var seek = function(time) {
     if (currentSoundFile) {
         currentSoundFile.setTime(time);
     }
 }
//Set Volume function
var setVolume = function (volume) {
	if (currentSoundFile) {
		currentSoundFile.setVolume(volume);
	}
};

//Song number cell
var getSongNumberCell = function (number) {
	return $('.song-item-number[data-song-number="' + number + '"]');
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
// Seek bar functionality
var updateSeekBarWhileSongPlays = function() {
     if (currentSoundFile) {
         currentSoundFile.bind('timeupdate', function(event) {
             var seekBarFillRatio = this.getTime() / this.getDuration();
             var $seekBar = $('.seek-control .seek-bar');
             updateSeekPercentage($seekBar, seekBarFillRatio);
         });
     }
 };

var updateSeekPercentage = function ($seekBar, seekBarFillRatio) {
	var offsetXPercent = seekBarFillRatio * 100;
	offsetXPercent = Math.max(0, offsetXPercent);
	offsetXPercent = Math.min(100, offsetXPercent);
	var percentageString = offsetXPercent + '%';
	$seekBar.find('.fill').width(percentageString);
	$seekBar.find('.thumb').css({
		left: percentageString
	});
};
 var setupSeekBars = function() {
     var $seekBars = $('.player-bar .seek-bar');
 
    $seekBars.click(function(event) {
        var offsetX = event.pageX - $(this).offset().left;
        var barWidth = $(this).width();
        var seekBarFillRatio = offsetX / barWidth;
        
        if ($(this).parent().attr('class') == 'seek-control') {
            seek(seekBarFillRatio * currentSoundFile.getDuration());
        } else {
            setVolume(seekBarFillRatio * 100);   
        }
        
        updateSeekPercentage($(this), seekBarFillRatio);
    });
	 
	 $seekBars.find('.thumb').mousedown(function(event) {

        var $seekBar = $(this).parent();

        $(document).bind('mousemove.thumb', function(event){
            var offsetX = event.pageX - $seekBar.offset().left;
            var barWidth = $seekBar.width();
            var seekBarFillRatio = offsetX / barWidth;
            
            if ($seekBar.parent().attr('class') == 'seek-control') {
                seek(seekBarFillRatio * currentSoundFile.getDuration());   
            } else {
                setVolume(seekBarFillRatio);
            }
            
            updateSeekPercentage($seekBar, seekBarFillRatio);
        });
         $(document).bind('mouseup.thumb', function() {
             $(document).unbind('mousemove.thumb');
             $(document).unbind('mouseup.thumb');
         });
     });
 };

var trackIndex = function (album, song) {
	return album.songs.indexOf(song);
};

var togglePlayFromPlayerBar = function () {
	var currentlyPlayingCell = getSongNumberCell(currentlyPlayingSongNumber);
	if (currentSoundFile.isPaused()) {
		currentlyPlayingCell.html(pauseButtonTemplate);
		$(this).html(playerBarPauseButton);
		currentSoundFile.play();
	} else if (currentSoundFile) {
		currentlyPlayingCell.html(playButtonTemplate);
		$(this).html(playerBarPlayButton);
		currentSoundFile.pause();
	}
};

// Change play button variables
var playButtonTemplate = '<a class="album-song-button"><span class="ion-play"></span></a>';
var pauseButtonTemplate = '<a class="album-song-button"><span class="ion-pause"></span></a>';
var playerBarPlayButton = '<span class="ion-play"></span>';
var playerBarPauseButton = '<span class="ion-pause"></span>';

var $previousButton = $('.main-controls .previous');
var $nextButton = $('.main-controls .next');

var $playPauseButton = $('.main-controls .play-pause');

var clickHandler = function () {
	var songNumber = parseInt($(this).attr('data-song-number'));
	if (currentlyPlayingSongNumber !== null) {
		var currentlyPlayingCell = getSongNumberCell(currentlyPlayingSongNumber);
		currentSongFromAlbum = $(this).siblings('.song-item-title').text();
		currentlyPlayingCell.html(currentlyPlayingSongNumber);
		updatePlayerBarSong();
	}
	if (currentlyPlayingSongNumber !== songNumber) {
		setSong(songNumber);
		currentSoundFile.play();
		
		updateSeekBarWhileSongPlays();
		//currentSongFromAlbum = currentAlbum.songs[songNumber - 1];
		 var $volumeFill = $('.volume .fill');
   var $volumeThumb = $('.volume .thumb');
   $volumeFill.width(currentVolume + '%');
   $volumeThumb.css({left: currentVolume + '%'});
		$(this).html(pauseButtonTemplate);
		updatePlayerBarSong();
	} else if (currentlyPlayingSongNumber === songNumber) {
		if (currentSoundFile.isPaused()) {
			$(this).html(pauseButtonTemplate);
			$('.main-controls .play-pause').html(playerBarPauseButton);
			currentSoundFile.play();
			updateSeekBarWhileSongPlays();
		} else {
			$(this).html(playButtonTemplate);
			$('.main-controls .play-pause').html(playerBarPlayButton);
			currentSoundFile.pause();
		}
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

	setSong(currentSongIndex + 1);
	currentSoundFile.play();
	updateSeekBarWhileSongPlays();
	updatePlayerBarSong();

	var lastSongNumber = getLastSongNumber(currentSongIndex);
	var $previousSongNumberCell = getSongNumberCell(currentlyPlayingSongNumber);
	var $lastSongNumberCell = getSongNumberCell(lastSongNumber);

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
	setSong(currentindex + 1);
	currentSoundFile.play();
	updateSeekBarWhileSongPlays();
	updatePlayerBarSong();

	var lastSongnumber = lastSong(currentindex);
	var $nextSongNumberCell = getSongNumberCell(currentlyPlayingSongNumber);
	var $lastSongNumberCell = getSongNumberCell(lastSongnumber);
	$nextSongNumberCell.html(pauseButtonTemplate);
	$lastSongNumberCell.html(lastSongnumber);
};



$(document).ready(function () {
	// Switch album variables
	var albumImage = document.getElementsByClassName('album-cover-art')[0];
	var albums = [albumPicasso, albumKuKaChu, albumMarconi];
	var current = 1;
	setCurrentAlbum(albumPicasso);
	setupSeekBars();
	$(albumImage).click(function () {
		setCurrentAlbum(albums[current]);
		current++;
		if (current == albums.length) {
			current = 0;
		}
	});
	$previousButton.click(previousSong);
	$nextButton.click(nextSong);
	$playPauseButton.click(togglePlayFromPlayerBar);
});