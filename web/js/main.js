$(document).ready(function() {

    prepareMenu();

});

function prepareMenu()
{
	$(function() {

        /*
        var html              = $(document.getElementsByTagName("html")[0]),
            body              = $(document.body),
        */

        var navIcon           = $('#nav-icon'),
            mobileNavigation  = $('.mn'),
	        isOpen            = false,
            topRange          = 200,
            edgeMargin        = 20,
            animationTime     = 1000,
            w                 = $(window).width(),
            currentSection    = "#home",
            marginTop         = 85,
            ncontent          = [],     // Desktop
            mcontent          = [];     // Mobile

        // ***** MENU FUNCTIONS ***** //

        function openMenu() {

            mobileNavigation.show();
            mobileNavigation.animate({'opacity':'1'}, 300, function() {

                //html.addClass('no-scroll');
                //body.addClass('no-scroll');

                document.ontouchmove = function(event) {
                    event.preventDefault();
                }

            });

        }



        function closeMenu() {

            mobileNavigation.animate({'opacity':'0'}, 300 , function() {

                // html.removeClass('no-scroll');
                // body.removeClass('no-scroll');

                mobileNavigation.hide();

                document.ontouchmove = null;

            });

        }

        function desktopMenu() {

            isOpen = !isOpen;

            if (navIcon.hasClass( 'open' ))
                $(navIcon).toggleClass( 'open' );

            closeMenu();

        }

        function getWindowWidth() {

            w = $(window).width();

            if (w < 768) {
                marginTop = 65;
            } else {
                marginTop = 85;
            }

            if (w > 1023 && navIcon.hasClass( 'open' ))
                desktopMenu();

        }

        $( navIcon ).click( function( e ) {

            e.preventDefault();

            $(this).toggleClass( 'open' );

    		isOpen = !isOpen;
    		isOpen ? openMenu() : closeMenu();

		});

        $(window).resize(function() {
			getWindowWidth();
            scrollToSection();
		});


        // ***** SCROLL TO FUNCTIONS ***** //

        function scrollToSection () {

            $( 'html, body' ).stop().animate({scrollTop: $(currentSection).offset().top-marginTop}, animationTime,'easeOutExpo');

        }

        $( 'html, body' ).stop().animate({scrollTop: $("#home").offset().top-marginTop}, 10,'');

    	// Stop animated scroll if the user does something
    	$( 'html,body' ).bind('scroll mousedown DOMMouseScroll mousewheel keyup', function(e) {

    		if ( e.which > 0 || e.type == 'mousedown' || e.type == 'mousewheel' ) {
    			$( 'html,body' ).stop();
    		}

    	});

    	// Set up content an array of locations normal view
        $( '#nn ').find( 'a' ).each(function( index ) {
            if ( index < 5 )
                ncontent.push( $($(this).attr( 'href' )).offset().top );
    	});

        // Set up content an array of locations mobile view
    	$( '#mn' ).find( 'a' ).each(function( index ) {
            if ( index < 5 )
                mcontent.push( $($(this).attr( 'href' )).offset().top );
    	});

    	// Animate menu scroll to content on desktop
    	$( '#nn' ).find( 'a' ).each(function( index ) {

            if ( index < 5 ) {

                $($(this)).click(function() {

                    currentSection = $(this).attr( 'href' );

                    scrollToSection();

            		return false;

                });

            }

    	});

        // Animate menu scroll to content on mobile
        $( '#mn' ).find( 'a' ).each(function( index ) {

            if ( index < 5 ) {

                $($(this)).click(function() {

                    currentSection = $(this).attr( 'href' );

                    scrollToSection();

                    $( navIcon ).toggleClass( 'open' );
            		isOpen = !isOpen;

                    closeMenu();

                    return false;

                });

            }

    	});

    	// adjust menu
    	$( window ).scroll(function() {

    		var winTop = $( window ).scrollTop(),
    		    bodyHt = $( document ).height(),
    		    vpHt   = $( window ).height() + edgeMargin;

      		$.each( ncontent, function(i,loc) {

       			if(( loc > winTop - edgeMargin && ( loc < winTop + topRange || (winTop + vpHt) >= bodyHt ))) {
        			$('#nn li a')
    					.removeClass( 'current' )
    					.eq(i).addClass( 'current' );
    			}

      		});

     	});

        getWindowWidth();

	});
}
