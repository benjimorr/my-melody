// Example Album Object
var albumPicasso = {
    title: 'The Colors',
    artist: 'Pablo Picasso',
    label: 'Cubism',
    year: '1881',
    albumArtUrl: 'assets/images/album_covers/01.png',
    songs: [
        {title: 'Blue', duration: '4:26'},
        {title: 'Green', duration: '3:14'},
        {title: 'Red', duration: '5:01'},
        {title: 'Pink', duration: '3:21'},
        {title: 'Magenta', duration: '2:15'}
    ]
};

// Another Example
var albumMarconi = {
    title: 'The Telephone',
    artist: 'Guglielmo Marconi',
    label: 'EM',
    year: '1909',
    albumArtUrl: 'assets/images/album_covers/20.png',
    songs: [
        {title: 'Hello, Operator?', duration: '1:01'},
        {title: 'Ring, ring, ring', duration: '5:01'},
        {title: 'Fits in your pocket', duration: '3:21'},
        {title: 'Can you hear me now?', duration: '3:14'},
        {title: 'Wrong phone number', duration: '2:15'}
    ]
};

// My own album Object
var albumMorrison = {
    title: 'My Life',
    artist: 'Ben Morrison',
    label: 'Spinnin Records',
    year: '2016',
    albumArtUrl: 'assets/images/album_covers/05.png',
    songs: [
        {title: 'The Beginning', duration: '4:35'},
        {title: 'Finding My Place', duration: '2:24'},
        {title: 'Party Till the Morning', duration: '3:31'},
        {title: 'Later Years', duration: '4:03'},
        {title: 'Outro', duration: '1:05'}
    ]
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
        var $songNumber = $(this).attr('data-song-number');

        if(currentlyPlayingSong !== null) {
            // Revert to song number for currently playing song because user started playing new song
            var $currentlyPlayingCell = $('.song-item-number[data-song-number="' + currentlyPlayingSong + '"]');
            $currentlyPlayingCell.html(currentlyPlayingSong);
        }
        if(currentlyPlayingSong !== $songNumber) {
            // Change this songNumber from a play to a pause button since it wasn't playing
            $(this).html(pauseButtonTemplate);
            currentlyPlayingSong = $songNumber;
        } else if(currentlyPlayingSong === $songNumber) {
            // Change this row's cell from a pause button to a play button because it was already playing
            $(this).html(playButtonTemplate);
            currentlyPlayingSong = null;
        }
    };

    // Functions for mouseover and mouseleave events
    var onHover = function(event) {
        var $songNumberCell = $(this).find('.song-item-number');
        var $songNumber = $songNumberCell.attr('data-song-number');

        if($songNumber !== currentlyPlayingSong) {
            $songNumberCell.html(playButtonTemplate);
        }
    };

    var offHover = function(event) {
        var $songNumberCell = $(this).find('.song-item-number');
        var $songNumber = $songNumberCell.attr('data-song-number');

        if($songNumber !== currentlyPlayingSong) {
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

// Album button templates
var playButtonTemplate = '<a class="album-song-button"><span class="ion-play"></span></a>';
var pauseButtonTemplate = '<a class="album-song-button"><span class="ion-pause"></span></a>';

// Store state of playing songs
var currentlyPlayingSong = null;

$(document).ready(function() {
    setCurrentAlbum(albumPicasso);
});
