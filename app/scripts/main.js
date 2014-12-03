// require(['jquery', 'consonance', 'less', 'jquery.blast', 'svg','less!styles/forserial'],
(function () {
        function id(i) {
            return i;
        }

        function rand(min, max, float, neg) {
            var sign = !!neg && Math.floor(Math.random() * 2) && -1 || 1;

            if (min === null) { min = 0; }
            if (max === null) { max = 100; }

            return sign * (!!float && id || Math.floor)(Math.random() * (max - min) + min);
        }

        function rc(alpha) {
            return 'rgb' + (alpha && 'a') + '(' + [1, 2, 3].map(function() {
                return rand(0, 255);
            }).join(',') + (alpha && (',' + rand(0, 1, true))) + ')';
        }

        function tr() {
            return 'rotate(' + rand(0, 90, false, true) + 'deg)';
        }

        function trr() {
            var easing = ['ease-in', 'ease-out', 'ease-in-out', 'linear'];
            return rand(0, 2, true) + 's all ' + easing[rand(0, easing.length)];
        }

        var dismantled = (function() {
            var d = [];

            return function dismantled(a) {
                if (typeof a !== 'undefined' && a !== null) {
                    d = [];
                    $(a).each(function(i, el) {
                        d.push($(el));
                    });
                    return d;
                } else {
                    return d;
                }
            };
        }());

        function dismantle() {
            $('.blast').each(function() {
                $(this).css('transition', trr());
                $(this).css({
                    transform: tr(),
                    color: rc(true)
                });
            });

            setInterval(function() {
                var $dismantled = dismantled(),
                    $el, style;

                if ($dismantled.length) {
                    $el = $($dismantled.pop());
                    if ($el.length) {
                        style = $el.get(0).style;
                        style.transform = null;
                        style.color = null;
                    }
                }
                dismantled($dismantled);
            }, 900);

        }

        function remantle() {
            $('.blast').each(function() {
                $(this).removeAttr('style');
            });
        }


        $(document).ready(function () {
            dismantled($('.subscript, .copy').blast({
                delimiter: 'word',
                returnGenerated: true
            }));
            $('header').blast({
                delimiter: 'character',
                generateValueClass: true
            });

            $('.blast-character-e').click(dismantle);
            $('.blast-character-f').click(remantle);
            $('.copy .blast, .subscript .blast').mouseenter(function() {
                $(this).removeAttr('style');
            });

            setTimeout(function () {
                $('.foo').addClass('face');
            }, 5000);
        });
});
