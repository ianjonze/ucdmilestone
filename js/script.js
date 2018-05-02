
        jQuery(function($) {
            'use strict';
            var supportsAudio = !!document.createElement('audio').canPlayType;
            if (supportsAudio) {
                var index = 0,
                    playing = false,
                    mediaPath = 'audio/',
                    extension = '',
                    tracks = [{
                        "track": 1,
                        "name": "Clarksville",
                        "duration": "2:46",
                        "file": "Clarksville"
                    }, {
                        "track": 2,
                        "name": "Daydream Believer",
                        "duration": "2:42",
                        "file": "DaydreamBeliever"
                    }, {
                        "track": 3,
                        "name": "I'm a Believer",
                        "duration": "2:35",
                        "file": "ImABeliever"
                    }, {
                        "track": 4,
                        "name": "Stepping Stone",
                        "duration": "2:22",
                        "file": "SteppingStone"
                    }],
                    buildPlaylist = $(tracks).each(function(key, value) {
                        var trackNumber = value.track,
                            trackName = value.name,
                            trackDuration = value.duration;
                        if (trackNumber.toString().length === 1) {
                            trackNumber = '0' + trackNumber;
                        }
                        $('#plList').append('<li><div class="plItem"><span class="plNum">' + trackNumber + '.</span><span class="plTitle">' + trackName + '</span><span class="plLength">' + trackDuration + '</span></div></li>');
                    }),
                    trackCount = tracks.length,
                    npAction = $('#npAction'),
                    npTitle = $('#npTitle'),
                    audio = $('#audio1').on('play', function() {
                        playing = true;
                        npAction.text('Now Playing...');
                    }).on('pause', function() {
                        playing = false;
                        npAction.text('Paused...');
                    }).on('ended', function() {
                        npAction.text('Paused...');
                        if ((index + 1) < trackCount) {
                            index++;
                            loadTrack(index);
                            audio.play();
                        }
                        else {
                            audio.pause();
                            index = 0;
                            loadTrack(index);
                        }
                    }).get(0),
                    btnPrev = $('#btnPrev').on('click', function() {
                        if ((index - 1) > -1) {
                            index--;
                            loadTrack(index);
                            if (playing) {
                                audio.play();
                            }
                        }
                        else {
                            audio.pause();
                            index = 0;
                            loadTrack(index);
                        }
                    }),
                    btnNext = $('#btnNext').on('click', function() {
                        if ((index + 1) < trackCount) {
                            index++;
                            loadTrack(index);
                            if (playing) {
                                audio.play();
                            }
                        }
                        else {
                            audio.pause();
                            index = 0;
                            loadTrack(index);
                        }
                    }),
                    li = $('#plList li').on('click', function() {
                        var id = parseInt($(this).index());
                        if (id !== index) {
                            playTrack(id);
                        }
                    }),
                    loadTrack = function(id) {
                        $('.plSel').removeClass('plSel');
                        $('#plList li:eq(' + id + ')').addClass('plSel');
                        npTitle.text(tracks[id].name);
                        index = id;
                        audio.src = mediaPath + tracks[id].file + extension;
                    },
                    playTrack = function(id) {
                        loadTrack(id);
                        audio.play();
                    };
                extension = audio.canPlayType('audio/mpeg') ? '.mp3' : audio.canPlayType('audio/ogg') ? '.ogg' : '';
                loadTrack(index);
            }
        });

        // initialize plyr
        plyr.setup($('#audio1'), {});

        // Scroll to top


        function scrollToDiv(link, target) {
            $(link).click(function() {
                $('html,body').animate({
                        scrollTop: $(target).offset().top
                    },
                    'slow');
            });
        }
        scrollToDiv(".historyBut", "#history");
        scrollToDiv(".meetBut", "#meet");
        scrollToDiv(".listenBut", "#listen");
        scrollToDiv(".hireBut", "#hire");
        scrollToDiv("#myBtn", ".logo-background");
        
        // button-fade
        
                window.onscroll = function() { scrollFunction() };
        function scrollFunction() {
            if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
                document.getElementById("myBtn").style.opacity = "0.7";
            }
            else {
                document.getElementById("myBtn").style.opacity = "0";
            }
        }