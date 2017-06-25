// Function to set values of currentlyPlayingSongNumber, currentSongFromAlbum, currentSoundFile, and currentVolume
var setSong = function(songNumber) {
    if(currentSoundFile) {
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

// Function to set the currentVolume variable
var setVolume = function(volume) {
    if(currentSoundFile) {
        currentSoundFile.setVolume(volume);
    }
};

// Function to return the song number element for a given song number
var getSongNumberCell = function(number) {
    return $('.song-item-number[data-song-number="' + number + '"]');
};

// Function to create an album song row
var createSongRow = function(songNumber, songName, songLength) {
    var template =
        '<tr class="album-view-song-item">'
    +   '   <td class="song-item-number" data-song-number="' + songNumber + '">' + songNumber + '</td>'
    +   '   <td class="song-item-title">' + songName + '</td>'
    +   '   <td class="song-item-duration">' + songLength + '</td>'
    +   '</tr>';

    var $row = $(template);

    var clickHandler = function() {
        var $songNumber = parseInt($(this).attr('data-song-number'));

        if(currentlyPlayingSongNumber !== null) {
            // Revert to song number for currently playing song because user started playing new song
            var $currentlyPlayingCell = getSongNumberCell(currentlyPlayingSongNumber);
            $currentlyPlayingCell.html(currentlyPlayingSongNumber);
        }
        if(currentlyPlayingSongNumber !== $songNumber) {
            // Change this songNumber from a play to a pause button since it wasn't playing, and play the song
            setSong($songNumber);
            currentSoundFile.play();
            $(this).html(pauseButtonTemplate);
            updatePlayerBarSong();
        } else if(currentlyPlayingSongNumber === $songNumber) {
            if(currentSoundFile.isPaused()) {
                // Continue playing the song that is paused
                $(this).html(pauseButtonTemplate);
                $('.main-controls .play-pause').html(playerBarPauseButton);
                currentSoundFile.play();
            } else {
                // Pause the current song because it is already playing
                $(this).html(playButtonTemplate);
                $('.main-controls .play-pause').html(playerBarPlayButton);
                currentSoundFile.pause();
            }
        }
    };

    // Functions for mouseover and mouseleave events
    var onHover = function(event) {
        var $songNumberCell = $(this).find('.song-item-number');
        var $songNumber = parseInt($songNumberCell.attr('data-song-number'));

        if($songNumber !== currentlyPlayingSongNumber) {
            $songNumberCell.html(playButtonTemplate);
        }
    };

    var offHover = function(event) {
        var $songNumberCell = $(this).find('.song-item-number');
        var $songNumber = parseInt($songNumberCell.attr('data-song-number'));

        if($songNumber !== currentlyPlayingSongNumber) {
            $songNumberCell.html($songNumber);
        }
    };

    $row.find('.song-item-number').click(clickHandler);
    $row.hover(onHover, offHover);
    // Returning this variable that now has event listeners attached to it
    return $row;
};

// Function to add current album to html
var setCurrentAlbum = function(album) {
    currentAlbum = album;

    var $albumTitle = $('.album-view-title');
    var $albumArtist = $('.album-view-artist');
    var $albumReleaseInfo = $('.album-view-release-info');
    var $albumImage = $('.album-cover-art');
    var $albumSongList = $('.album-view-song-list');

    $albumTitle.text(album.title);
    $albumArtist.text(album.artist);
    $albumReleaseInfo.text(album.year + ' ' + album.label);
    $albumImage.attr('src', album.albumArtUrl);

    $albumSongList.empty();

    for(var i = 0; i < album.songs.length; i++) {
        var $newRow = createSongRow(i + 1, album.songs[i].title, album.songs[i].duration);
        $albumSongList.append($newRow);
    }
};

// Function to find/return the index of a song, given a song and its album
var trackIndex = function(album, song) {
    return album.songs.indexOf(song);
};

// Function to update the player bar with the currently playing song, and change the play/pause button
var updatePlayerBarSong = function() {
    $('.currently-playing .song-name').text(currentSongFromAlbum.title);
    $('.currently-playing .artist-song-mobile').text(currentSongFromAlbum.title + " - " + currentAlbum.artist);
    $('.currently-playing .artist-name').text(currentAlbum.artist);

    $('.main-controls .play-pause').html(playerBarPauseButton);
};

// Functions to control the song change functionality when the next and prev buttons are pressed
var nextSong = function() {
    var currentSongIndex = trackIndex(currentAlbum, currentSongFromAlbum);
    currentSongIndex++;

    if(currentSongIndex >= currentAlbum.songs.length) {
        currentSongIndex = 0;
    }

    // Save last song number before changing it
    var lastSongNumber = currentlyPlayingSongNumber;

    // Set and play new current song
    setSong(currentSongIndex + 1);
    currentSoundFile.play();

    // Update player bar info
    updatePlayerBarSong();

    getSongNumberCell(lastSongNumber).html(lastSongNumber);
    getSongNumberCell(currentlyPlayingSongNumber).html(pauseButtonTemplate);
};

var previousSong = function() {
    var currentSongIndex = trackIndex(currentAlbum, currentSongFromAlbum);
    currentSongIndex--;

    if(currentSongIndex < 0) {
        currentSongIndex = currentAlbum.songs.length - 1;
    }

    // Save last song number before changing it
    var lastSongNumber = currentlyPlayingSongNumber;

    // Set and play new current song
    setSong(currentSongIndex + 1);
    currentSoundFile.play();

    // Update player bar info
    updatePlayerBarSong();

    getSongNumberCell(lastSongNumber).html(lastSongNumber);
    getSongNumberCell(currentlyPlayingSongNumber).html(pauseButtonTemplate);
};

// Album button templates
var playButtonTemplate = '<a class="album-song-button"><span class="ion-play"></span></a>';
var pauseButtonTemplate = '<a class="album-song-button"><span class="ion-pause"></span></a>';
var playerBarPlayButton = '<span class="ion-play"></span>';
var playerBarPauseButton = '<span class="ion-pause"></span>';

// Store state of playing songs and its album
var currentAlbum = null;
var currentlyPlayingSongNumber = null;
var currentSongFromAlbum = null;
var currentSoundFile = null;
var currentVolume = 80;

// Variables to add event handlers to next and prev buttons
var $previousButton = $('.main-controls .previous');
var $nextButton = $('.main-controls .next');

$(document).ready(function() {
    setCurrentAlbum(albumPicasso);
    $previousButton.click(previousSong);
    $nextButton.click(nextSong);
});
