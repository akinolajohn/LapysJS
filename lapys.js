// LapysJS Copyright (C) 2017 The Lapys Dev Team. All rights reserved.
// Use of this source code is governed by a GNU GENERAL PUBLIC license that can be
// found in the LICENSE file.

/* Strict Mode */
"use strict";

/* LapysJS Object */
var LapysJS = {
    author : "Lapys Dev Team",
    executed : false,
    javascript :
        document.querySelectorAll('script[src*="lapys.js"]')[0] ||
        document.querySelectorAll('script[src*="lapys.min.js"]')[0],
    javascriptURL :
        document.querySelectorAll('script[src*="lapys.js"]')[0].getAttribute("src").toString() ||
        document.querySelectorAll('script[src*="lapys.min.js"]')[0].getAttribute("src").toString(),
    lastExecuted : "Last executed on: " + Date(),
    name : "LapysJS",
    strictMode : (function() {
        return !this
    })(),
    stylesheet : 
        document.querySelectorAll('link[href*="lapys.css"]')[0] ||
        document.querySelectorAll('link[href*="lapys.min.css"]')[0],
    version : "1.0.0"
}
    // LapysJS.stylesheetURL
    if (LapysJS.stylesheet != undefined)
        LapysJS.stylesheetURL =
            document.querySelectorAll('link[href*="lapys.css"]')[0].getAttribute("href") ||
            document.querySelectorAll('link[href*="lapys.min.css"]')[0].getAttribute("href")

/* Global Object Test
    --- NOTE ---
        LapysJS should not have been executed at this point.
*/
if (window && !LapysJS.executed) {
/* Start Main Function */

    /* Syntax */
        // Add Event Listener
        var addEvent = (element, event, func) => {
            return element.addEventListener(event, func)
        },

        // Set Attribute
        attr = (element, attribute, value) => {
            /* --- NOTE ---
                    If
                        no value is given, append an empty value ("") to fulfill
                        both arguments of the setAttribute() function.
            */
            if (value == undefined)
                return element.setAttribute(attribute, "")
            else
                return element.setAttribute(attribute, value)
        },

        // Set Class Attribute
        className = (element, value) => {
            /* --- NOTE ---
                    If
                        there is no class for the element,
                        append the given value directly
                    else
                        add white-space before appending
                        the given value.
            */
            if (element.classList.value == "")
                return element.classList.value = value
            else
                return element.classList.value += " " + value
        },

        // Create Element
        create = (element) => {
            return document.createElement(element)
        },

        // CSS Functions
        css = {
            // Create <link>
            add : (href, media, rel, type) => {
                // Append the <link> element within the <head> element.
                document.getElementsByTagName("head")[0].innerHTML += (
                    '<link href="' + href + '" media="' + media + '" rel="' + rel + '" type="' + type + '">')
            },
            
            // Create <style>
            style : (dataKey, selector, property, atRule) => {
                // Create a new <style> element.
                var cssStyle = document.createElement("style")
                // Uniquely identify the <style> element.
                cssStyle.setAttribute("data-key", dataKey)
                // Append the element into the <head> element.
                document.getElementsByTagName("head")[0].appendChild(cssStyle)
                // The option for CSS at-rules is given here.
                if (atRule == undefined)
                    cssStyle.innerHTML += "\n" + selector + " { " + property + " }"
                else
                    cssStyle.innerHTML += "\n" + selector + " { " + property + " } " + atRule
            }
        },

        // Delete Functions
        del = {
            // Delete Attribute
            attr : (element, attribute) => {
                return element.removeAttribute(attribute)
            },
            
            // Delete Element Class
            class : (element, className) => {
                if (element.classList.value == "") {
                    // Do nothing…
                } else {
                    // Index all the element's class values
                    for (i = 0; i < element.classList.length; i++)
                        // If a match is found, remove the class given
                        if (className == element.classList[i])
                            element.classList.value = element.classList.value.replace(className, "")

                    // If there are only two classes, remove all white-spaces
                    if (element.classList[1] == undefined)
                        element.classList.value = element.classList.value.replace(/ /g, "")

                    // If there is white-space before any class value, remove it
                    if (element.classList.value.indexOf(" ") == 0)
                        element.classList.value = element.classList.value.replace(" ", "")                    
                }
            },

            // Delete <link>
            link : (href, media, rel, type) => {
                // Delete the specified <link> element within the <head> element.
                if (type != undefined)
                    // If the "type" attribute is specified
                    document.getElementsByTagName("head")[0].removeChild(
                        document.querySelectorAll('link[href="' + href + '"][media="' + media + '"][rel="' + rel + '"][type="' + type + '"]')[0])
                else
                    document.getElementsByTagName("head")[0].removeChild(
                        document.querySelectorAll('link[href="' + href + '"][media="' + media + '"][rel="' + rel + '"]')[0])
            },
            
            // Delete HTML
            html : (element, index) => {
                if (index == undefined)
                    return element.parentNode.removeChild(element)
                else
                    return element[index].parentNode.removeChild(element[index])
            },

            // Delete <style>
            style : (dataKey) => {
                document.querySelectorAll('style[data-key="' + dataKey + '"]')[0].parentNode.removeChild(
                    document.querySelectorAll('style[data-key="' + dataKey + '"]')[0])
            }
        },

        // Remove Event Listener
        delEvent = (element, event, func) => {
            return element.removeEventListener(event, func)
        },

        // Directory
        dir = {
            // Complete URL
            fullPath : location.href
        },
        
        // Files
        file = {
            // Close Files
            close : (directory) => {
                var file = new File(directory)

                // Open the file
                file.close()
            },

            // Open Files
            open : (directory) => {
                var file = new File(directory)

                // Open the file
                file.open()
            },

            // Read files
            read : (directory) => {
                var file = new File(directory)

                // Open the file with "Read" access
                file.open("r")
                // Parse the file content into the "content" variable
                var content = ""
                    // Read each line of content
                    while (!file.eof)
                        content += file.readIn() + "\n"
                // Close the file
                file.close()

                return content
            },

            // Write files
            write : (directory, content) => {
                var file = new File(directory)

                // Open the file via "Write" access
                file.open("w")
                // Write into the file
                file.writeIn(content)
                // Close the file
                file.close()
            }
        },

        // insertAfter Function
        insertAfter = (element, nextSibling) => {
            /* --- NOTE ---
                    The "nextSibling" has to defined in the DOM
                        before it can be placed after the "element".
            */
            nextSibling.parentNode.insertBefore(element, nextSibling)

            return nextSibling.parentNode.insertBefore(nextSibling, element)
        },

        // insertBefore Function
        insertBefore = (element, previousSibling) => {
            return previousSibling.parentNode.insertBefore(element, previousSibling)
        },

        // Get Functions
        get = {
            // Get Attribute
            attr : (element, attribute, index) => {
                if (index == undefined)
                    return element.getAttribute(attribute)
                else
                    return element[index].getAttribute(attribute)
            },

            // Get Class Attribute
            class : (element, index) => {
                if (index == undefined)
                    return element.classList
                else
                    return element[index].classList
            },

            // Get CSS
            css : (property, element, index) => {
                if (index == undefined)
                    return window.getComputedStyle(element).getPropertyValue(property)
                else
                    return window.getComputedStyle(element[index]).getPropertyValue(property)
            },

            // Get HTML
            html : (element, index) => {
                if (index == undefined)
                    return document.querySelectorAll(element)
                else
                    return document.querySelectorAll(element)[index]
            }
        },

        // Assign Directory
        goTo = (directory) => {
            return location.assign(directory)
        },

        // Log Object
        log = (object) => {
            return console.log(object)
        },

        // Boolean Conversion
        parseBool = (object) => {
            if (object)
                return true
            else
                return false
        },

        /* Indexing Order
            --- NOTE ---
                Useful for position prefix.
        */
        parseIndex = (object) => {
            if (object.toString().indexOf("1") == 0 &&
                object.toString()[1] != undefined &&
                object.toString()[1] != "0")
                return object + "th"

            else if (object.toString().lastIndexOf("1") == (object.toString().length - 1))
                return object + "st"
            
            else if (object.toString().lastIndexOf("2") == (object.toString().length - 1))
                return object + "nd"
            
            else if (object.toString().lastIndexOf("3") == (object.toString().length - 1))
                return object + "rd"
            
            else
                return object + "th"
        },

        /* Stringify Object
            --- NOTE ---
                Converts HTML elements to text format
                using UTF-8 character encoding.
        */
        parseString = (object) => {
            if (object[0] != undefined)
                if (object[0].tagName !== "ELEMENT")
                    return object.toString().replace(/</g, "&lt;").replace(/>/g, "&gt;")
                else
                    return console.warn("Object data not found.")

            else
                return object.toString()
        },

        // Reload Function
        refresh = () => {
            return location.reload()
        },

        // Write Object
        write = (object) => {
            return document.write(object)
        }

        // Directory
            // File Parent URL
            if (location.href.indexOf(".") >= 0)
                dir.path = location.href.slice(0, (location.href.lastIndexOf("/")))

    /* Document JS */
        // Refine the Global Object properties
        window.name = document.getElementsByTagName("title")[0].textContent

    /* Objects */
        // Document
        document.html = document.getElementsByTagName("html")[0]

        // Boolean
        var bin = false
        
        // Browser
        var browser = {
            chrome: false,
            edge: false,
            IE: false,
            mozila: false,
            opera: false,
            safari: false,
            type: undefined
        }
            // Opera 8.0+
            if ((!!window.opr && !!opr.addons) ||
                !!window.opera ||
                navigator.userAgent.indexOf("OPR/") >= 0) {
                browser.opera = true
                browser.type = "Opera 8.0+"
            }
            // Mozila Firefox 1.0+
            if (typeof InstallTrigger !== "undefined") {
                browser.mozila = true
                browser.type = "Firefox 1.0+"
            }
            // Safari 3.0+
            if (/constructor/i.test(window.HTMLElement) ||
                (function(p) { return p.toString() === "[object SafariRemoteNotification]" })(!window["safari"] || safari.pushNotification)) {
                browser.safari = true
                browser.type = "Safari 3.0+"
            }
            // Internet Explorer 6-11
            if ( /*@cc_on!@*/ false ||
                !!document.documentMode) {
                browser.IE = true
                browser.type = "Internet Explorer 6-11"
            }
            // Microsoft Edge 20+
            if (!( /*@cc_on!@*/ false || !!document.documentMode) &&
                !window.StyleMedia) {
                browser.edge = true
                browser.type = "Edge 20+"
            }
            // Google Chrome 1+
            if (!!window.chrome &&
                !!window.chrome.webstore) {
                browser.chrome = true
                browser.type = "Chrome 1+"
            }

        // HTML Document Type
        var HTMLDoctype = (
                '<!DOCTYPE ' +
                    (document.doctype.name) +
                    (document.doctype.publicId ? ' PUBLIC "' + document.doctype.publicId + '"' : '') +
                    (!document.doctype.publicId && document.doctype.systemId ? ' SYSTEM' : '')  +
                    (document.doctype.systemId ? ' "' + document.doctype.systemId + '"' : '') +
                '>'
        )

        // Time Interval Counter
        var count = 0
        
        // Loop Counters
        var i, j, k

        // Device
        var device = {
            availLeft: window.screen.availLeft,
            availHeight: window.screen.availHeight,
            availTop: window.screen.availTop,
            availWidth: window.screen.availWidth,
            colorDepth: window.screen.colorDepth,
            height: window.screen.height,
            pixelRatio: window.devicePixelRatio,
            screenAngle: window.screen.orientation.angle,
            screenOrientation: window.screen.orientation.type,
            sizeBase: "",
            width: window.screen.width,
            widthBase: "0px"
        }
            // Device Screen
                // Mobile S - 320px 
                if (document.body.clientWidth <= 320 &&
                    document.body.clientWidth >= 0) {
                    device.sizeBase = "Mobile S"
                    device.widthBase = "320px"
                }
                // Mobile M - 375px 
                if (document.body.clientWidth <= 375 &&
                    document.body.clientWidth >= 321) {
                    device.sizeBase = "Mobile M"
                    device.widthBase = "375px"
                }
                // Mobile L - 425px 
                if (document.body.clientWidth <= 425 &&
                    document.body.clientWidth >= 376) {
                    device.sizeBase = "Mobile L"
                    device.widthBase = "425px"
                }
                // Tablet - 768px 
                if (document.body.clientWidth <= 768 &&
                    document.body.clientWidth >= 426) {
                    device.sizeBase = "Tablet"
                    device.widthBase = "768px"
                }
                // Laptop - 1024px 
                if (document.body.clientWidth <= 1024 &&
                    document.body.clientWidth >= 769) {
                    device.sizeBase = "Laptop"
                    device.widthBase = "1024px"
                }
                // Laptop L - 1440px 
                if (document.body.clientWidth <= 1440 &&
                    document.body.clientWidth >= 1025) {
                    device.sizeBase = "Laptop L"
                    device.widthBase = "1440px"
                }
                // 4K - 2560px 
                if (document.body.clientWidth <= 2560 &&
                    document.body.clientWidth >= 1441) {
                    device.sizeBase = "4K"
                    device.widthBase = "2560px"
                }

        // Operating System
        var OS = {
            mac : false,
            linux : false,
            type : undefined,
            unix : false,
            windows : false
        }
            if (navigator.appVersion.indexOf("Win") >= 0)
                OS.windows = true
                OS.type = "Windows"
            if (navigator.appVersion.indexOf("Mac") >= 0)
                OS.mac = true
                OS.type = "Mac"
            if (navigator.appVersion.indexOf("X11") >= 0)
                OS.unix = true
                OS.type = "Unix"
            if (navigator.appVersion.indexOf("Linux") >= 0)
                OS.linux = true
                OS.type = "Linux"
        
        // Random Number (within 1 and 10)
        var rand = Math.random() * 10
        
        // Date & Time
        var date = {
            dyIndex: new Date().getDate(),
            fullDate: Date(),
            hr: new Date().getHours(),
            min: new Date().getMinutes(),
            mthIndex: new Date().getMonth() + 1,
            sec: new Date().getSeconds(),
            yr: new Date().getFullYear()
        }
            // date.dy
            if (Date().indexOf("Sun") >= 0) date.dy = "Sunday"
            if (Date().indexOf("Mon") >= 0) date.dy = "Monday"
            if (Date().indexOf("Tue") >= 0) date.dy = "Tuesday"
            if (Date().indexOf("Wed") >= 0) date.dy = "Wednesday"
            if (Date().indexOf("Thu") >= 0) date.dy = "Thursday"
            if (Date().indexOf("Fri") >= 0) date.dy = "Friday"
            if (Date().indexOf("Sat") >= 0) date.dy = "Saturday"
            // date.mth
            if (Date().indexOf("Jan") >= 0) date.mth = "January"
            if (Date().indexOf("Feb") >= 0) date.mth = "February"
            if (Date().indexOf("Mar") >= 0) date.mth = "March"
            if (Date().indexOf("Apr") >= 0) date.mth = "April"
            if (Date().indexOf("May") >= 0) date.mth = "May"
            if (Date().indexOf("Jun") >= 0) date.mth = "June"
            if (Date().indexOf("Jul") >= 0) date.mth = "July"
            if (Date().indexOf("Aug") >= 0) date.mth = "August"
            if (Date().indexOf("Sep") >= 0) date.mth = "September"
            if (Date().indexOf("Oct") >= 0) date.mth = "October"
            if (Date().indexOf("Nov") >= 0) date.mth = "November"
            if (Date().indexOf("Dec") >= 0) date.mth = "December"
            // The "date" object can be updated continuously if chosen
            if (false) {
                setInterval(function() {
                    if (Date().indexOf("Sun") >= 0) date.dy = "Sunday"
                    if (Date().indexOf("Mon") >= 0) date.dy = "Monday"
                    if (Date().indexOf("Tue") >= 0) date.dy = "Tuesday"
                    if (Date().indexOf("Wed") >= 0) date.dy = "Wednesday"
                    if (Date().indexOf("Thu") >= 0) date.dy = "Thursday"
                    if (Date().indexOf("Fri") >= 0) date.dy = "Friday"
                    if (Date().indexOf("Sat") >= 0) date.dy = "Saturday"
                    date.dyIndex = new Date().getDate()
                    date.fullDate = Date()
                    date.hr = new Date().getHours()
                    date.min = new Date().getMinutes()
                    if (Date().indexOf("Jan") >= 0) date.mth = "January"
                    if (Date().indexOf("Feb") >= 0) date.mth = "February"
                    if (Date().indexOf("Mar") >= 0) date.mth = "March"
                    if (Date().indexOf("Apr") >= 0) date.mth = "April"
                    if (Date().indexOf("May") >= 0) date.mth = "May"
                    if (Date().indexOf("Jun") >= 0) date.mth = "June"
                    if (Date().indexOf("Jul") >= 0) date.mth = "July"
                    if (Date().indexOf("Aug") >= 0) date.mth = "August"
                    if (Date().indexOf("Sep") >= 0) date.mth = "September"
                    if (Date().indexOf("Oct") >= 0) date.mth = "October"
                    if (Date().indexOf("Nov") >= 0) date.mth = "November"
                    if (Date().indexOf("Dec") >= 0) date.mth = "December"
                    date.mthIndex = new Date().getMonth() + 1
                    date.sec = new Date().getSeconds()
                    date.yr = new Date().getFullYear()
                }, 1)
            }

/* --- WARN ---
        From here on, every code here is localized.
*/
(function() {
        // HTML Elements
            // Define Elements
                // <abbr> 
                var abbr = document.querySelectorAll("abbr"),
                // *
                all = document.querySelectorAll("*"),
                // <body> 
                body = document.getElementsByTagName("body")[0] || document.body,
                // <br>
                br = document.getElementsByTagName("br"),
                /* <default>
                        --- NOTE ---
                            Unfortunately, "default" is a keyword,
                            so the variable can not be named "default".
                */
                Default = document.getElementsByTagName("default"),
                // <head> 
                head = document.getElementsByTagName("head")[0] || document.head,
                // <html> 
                html = document.getElementsByTagName("html")[0],
                // <lorem>
                lorem = document.getElementsByTagName("lorem"),
                // <main> 
                main = document.getElementsByTagName("main")[0],
                // <time>
                time = document.getElementsByTagName("time")
            // Special Elements
                /* <default>
                        --- NOTE ---
                            This resets every CSS rule
                            on the element and its children.

                            The CSS reset is also coupled
                            by some Javascript to fortify the reset.
                */
                setInterval(function() {
                    for (i = 0; i < Default.length; i++)
                        Default[i].setAttribute("style",
                            "all: initial !important; " +
                            "background-color: initial !important; " +
                            "color: initial !important")
                    for (i = 0; i < document.querySelectorAll("default *").length; i++)
                        document.querySelectorAll("default *")[i].setAttribute("style",
                            "all: initial !important; " +
                            "background-color: initial !important; " +
                            "color: initial !important")
                }, 1)
                /* <lorem>
                        --- NOTE ---
                            Dummy text is quickly inserted in
                            the page with <lorem> tags.
                */
                    // Dummy Text Level 1
                    if (rand <= 2.5)
                        var loremHTMLLevel1 = "This string has thirty-nine characters"
                    else if (rand <= 5)
                        var loremHTMLLevel1 = "Lorem ipsum dolor sit amet, consectetuer adipiscing elit."
                    else if (rand <= 7.5)
                        var loremHTMLLevel1 = "Li Europan lingues es membres del sam familie."
                    else
                        var loremHTMLLevel1 = "The quick, brown fox jumps over a lazy dog."
                    
                    // Dummy Text Level 2
                    if (rand <= 2.5)
                        var loremHTMLLevel2 = "Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts."
                    else if (rand <= 5)
                        var loremHTMLLevel2 = "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa."
                    else if (rand <= 7.5)
                        var loremHTMLLevel2 = "Li Europan lingues es membres del sam familie. Lor separat existentie es un myth. Por scientie, musica, sport etc, litot Europa usa li sam vocabular."
                    else
                        var loremHTMLLevel2 = "The quick, brown fox jumps over a lazy dog. DJs flock by when MTV ax quiz prog."
                    
                    // Dummy Text Level 3
                    if (rand <= 2.5)
                        var loremHTMLLevel3 = "Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean. A small river named Duden flows by their place and supplies it with the necessary regelialia."
                    else if (rand <= 5)
                        var loremHTMLLevel3 = "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim."
                    else if (rand <= 7.5)
                        var loremHTMLLevel3 = "Li Europan lingues es membres del sam familie. Lor separat existentie es un myth. Por scientie, musica, sport etc, litot Europa usa li sam vocabular. Li lingues differe solmen in li grammatica, li pronunciation e li plu commun vocabules. Omnicos directe al desirabilite de un nov lingua franca: On refusa continuar payar custosi traductores."
                    else
                        var loremHTMLLevel3 = "The quick, brown fox jumps over a lazy dog. DJs flock by when MTV ax quiz prog. Junk MTV quiz graced by fox whelps. Bawds jog, flick quartz, vex nymphs. Waltz, bad nymph, for quick jigs vex! Fox nymphs grab quick-jived waltz. Brick quiz whangs jumpy veldt fox. Bright vixens jump; dozy fowl quack. Quick wafting zephyrs vex bold Jim."
                    
                    // Dummy Text Level 4
                    if (rand <= 2.5)
                        var loremHTMLLevel4 = "Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean. A small river named Duden flows by their place and supplies it with the necessary regelialia. It is a paradisematic country, in which roasted parts of sentences fly into your mouth. Even the all-powerful Pointing has no control about the blind texts it is an almost unorthographic life One day however a small line of blind text by the name of Lorem Ipsum decided to leave for the far World of Grammar."
                    else if (rand <= 5)
                        var loremHTMLLevel4 = "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim."
                    else if (rand <= 7.5)
                        var loremHTMLLevel4 = "Li Europan lingues es membres del sam familie. Lor separat existentie es un myth. Por scientie, musica, sport etc, litot Europa usa li sam vocabular. Li lingues differe solmen in li grammatica, li pronunciation e li plu commun vocabules. Omnicos directe al desirabilite de un nov lingua franca: On refusa continuar payar custosi traductores. At solmen va esser necessi far uniform grammatica, pronunciation e plu sommun paroles. Ma quande lingues coalesce, li grammatica del resultant lingue es plu simplic e regulari quam ti del coalescent lingues. Li nov lingua franca va esser plu simplic e regulari quam li existent Europan lingues."
                    else
                        var loremHTMLLevel4 = "The quick, brown fox jumps over a lazy dog. DJs flock by when MTV ax quiz prog. Junk MTV quiz graced by fox whelps. Bawds jog, flick quartz, vex nymphs. Waltz, bad nymph, for quick jigs vex! Fox nymphs grab quick-jived waltz. Brick quiz whangs jumpy veldt fox. Bright vixens jump; dozy fowl quack. Quick wafting zephyrs vex bold Jim. Quick zephyrs blow, vexing daft Jim. Sex-charged fop blew my junk TV quiz. How quickly daft jumping zebras vex. Two driven jocks help fax my big quiz. Quick, Baz, get my woven flax jodhpurs! " + '"Now fax quiz Jack!"' + " my brave ghost pled. Five quacking zephyrs jolt my wax bed."
                    
                    // Dummy Text Level 5
                    if (rand <= 2.5)
                        var loremHTMLLevel5 = "Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean. A small river named Duden flows by their place and supplies it with the necessary regelialia. It is a paradisematic country, in which roasted parts of sentences fly into your mouth. Even the all-powerful Pointing has no control about the blind texts it is an almost unorthographic life One day however a small line of blind text by the name of Lorem Ipsum decided to leave for the far World of Grammar. The Big Oxmox advised her not to do so, because there were thousands of bad Commas, wild Question Marks and devious Semikoli, but the Little Blind Text didn’t listen. She packed her seven versalia, put her initial into the belt and made herself on the way. When she reached the first hills of the Italic Mountains, she had a last view back on the skyline of her hometown Bookmarksgrove, the headline of  Alphabet Village and the sublime of her own road, the Line Lane. Pityful a rethoric question ran over her cheek, then ..."
                    else if (rand <= 5)
                        var loremHTMLLevel5 = "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum. Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem. Maecenas nec odio et ante tincidunt tempus. Donec vitae sapien ut libero venenatis faucibus. Nullam quis ante. Etiam sit amet orci eget eros faucibus tincidunt. Duis leo. Sed fringilla mauris sit amet nibh. Donec sodales sagittis magna. Sed consequat, leo eget bibendum sodales, augue velit cursus nunc, ..."
                    else if (rand <= 7.5)
                        var loremHTMLLevel5 = "Li Europan lingues es membres del sam familie. Lor separat existentie es un myth. Por scientie, musica, sport etc, litot Europa usa li sam vocabular. Li lingues differe solmen in li grammatica, li pronunciation e li plu commun vocabules. Omnicos directe al desirabilite de un nov lingua franca: On refusa continuar payar custosi traductores. At solmen va esser necessi far uniform grammatica, pronunciation e plu sommun paroles. Ma quande lingues coalesce, li grammatica del resultant lingue es plu simplic e regulari quam ti del coalescent lingues. Li nov lingua franca va esser plu simplic e regulari quam li existent Europan lingues. It va esser tam simplic quam Occidental in fact, it va esser Occidental. A un Angleso it va semblar un simplificat Angles, quam un skeptic Cambridge amico dit me que Occidental es.Li Europan lingues es membres del sam familie. Lor separat existentie es un myth. Por scientie, musica, sport etc, litot Europa usa li sam vocabular. Li lingues differe solmen in li grammatica, li pronuncion e li plu commun vocabules. Omnicos directe al desirabilite de un nov lingua franca: On refusa continuar payar custosi traductores. At solmen va esser necessi far uniform grammatica, pronunciation e plu sommun paroles."
                    else
                        var loremHTMLLevel5 = "The quick, brown fox jumps over a lazy dog. DJs flock by when MTV ax quiz prog. Junk MTV quiz graced by fox whelps. Bawds jog, flick quartz, vex nymphs. Waltz, bad nymph, for quick jigs vex! Fox nymphs grab quick-jived waltz. Brick quiz whangs jumpy veldt fox. Bright vixens jump; dozy fowl quack. Quick wafting zephyrs vex bold Jim. Quick zephyrs blow, vexing daft Jim. Sex-charged fop blew my junk TV quiz. How quickly daft jumping zebras vex. Two driven jocks help fax my big quiz. Quick, Baz, get my woven flax jodhpurs! " + '"Now fax quiz Jack!"' + " my brave ghost pled. Five quacking zephyrs jolt my wax bed. Flummoxed by job, kvetching W. zaps Iraq. Cozy sphinx waves quart jug of bad milk. A very bad quack might jinx zippy fowls. Few quips galvanized the mock jury box. Quick brown dogs jump over the lazy fox. The jay, pig, fox, zebra, and my wolves quack! Blowzy red vixens fight for a quick jump. Joaquin Phoenix was gazed by MTV for luck. A wizard’s job is to vex chumps quickly in fog. Watch " + '"Jeopardy!"' + ", Alex Trebek's fun TV quiz game. Woven silk pyjamas exchanged for blue quartz. Brawny gods just ..."

                    // Allocate the dummy text
                    for (i = 0; i < lorem.length; i++) {
                        if (lorem[i].hasAttribute("1"))
                            lorem[i].innerHTML = loremHTMLLevel1
                        if (lorem[i].hasAttribute("2"))
                            lorem[i].innerHTML = loremHTMLLevel2
                        if (lorem[i].hasAttribute("3"))
                            lorem[i].innerHTML = loremHTMLLevel3
                        if (lorem[i].hasAttribute("4"))
                            lorem[i].innerHTML = loremHTMLLevel4
                        if (lorem[i].hasAttribute("5"))
                            lorem[i].innerHTML = loremHTMLLevel5
                    }
            /* Alternated Elements
                    --- NOTE ---
                        Set a timeout for Javascript coded
                        alternated elements.
            */
                setTimeout(function() {
                    // <abbr>
                        // <abbr> Inner HTML
                        var abbrHTML = {  },
                        // <abbr> "abbr" Attribute Value
                            abbrHTMLAbbr = {  }

                        for (i = 0; i < abbr.length; i++) {
                            // Toggle the element's content between its original value and the "abbr" attribute given
                            if (abbr[i].hasAttribute("abbr")) {
                                // Stringify the element's content
                                abbr[i].innerHTML = abbr[i].innerHTML.toString().replace(/</g, "&lt;").replace(/>/g, "&gt;")
                                
                                // Catch the element's HTML content & "abbr" attribute value
                                abbrHTML[i] = abbr[i].innerHTML
                                abbrHTMLAbbr[i] = abbr[i].getAttribute("abbr")
                                
                                // Index the element
                                abbr[i].setAttribute("data-index", i)
                                
                                // Add the events
                                abbr[i].onmouseleave = function() {
                                    this.innerHTML = abbrHTML[this.getAttribute("data-index")]
                                }
                                abbr[i].onmouseover = function() {
                                    this.innerHTML = abbrHTMLAbbr[this.getAttribute("data-index")]
                                }
                            }
                        }

                    // <br>
                    setInterval(function() {
                        for (i = 0; i < br.length; i++) {
                            // Add a second <br> if the initial <br> has an attribute of "2"
                            if (br[i].hasAttribute("2") &&
                                br[i].getAttribute("data-newline") != "true") {

                                br[i].insertAdjacentHTML("afterend", " <br>")
                                
                                // Add properties to connote the addition
                                br.newline = true
                                br[i].setAttribute("data-newline", "true")
                            }
                        }
                    }, 1)

                    /* <time> 
                        --- NOTE ---
                            The script below is similar to the LapysJS "date" object.
                    */
                    function timeHTML() {
                        for (i = 0; i < time.length; i++) {
                            // Day
                            if (time[i].className.indexOf("dy") >= 0) {
                                if (Date().toString().indexOf("Sun") >= 0)
                                    time[i].innerHTML = "Sunday"

                                if (Date().toString().indexOf("Mon") >= 0)
                                    time[i].innerHTML = "Monday"
                                
                                if (Date().toString().indexOf("Tue") >= 0)
                                    time[i].innerHTML = "Tuesday"
                                
                                if (Date().toString().indexOf("Wed") >= 0)
                                    time[i].innerHTML = "Wednesday"
                                
                                if (Date().toString().indexOf("Thu") >= 0)
                                    time[i].innerHTML = "Thursday"
                                
                                if (Date().toString().indexOf("Fri") >= 0)
                                    time[i].innerHTML = "Friday"
                                
                                if (Date().toString().indexOf("Sat") >= 0)
                                    time[i].innerHTML = "Saturday"
                            }
                            
                            // Date
                            if (time[i].className.indexOf("dyIndex") >= 0)
                                time[i].innerHTML = new Date().getDate()
                            
                            // Date with Postfix
                            if (time[i].className.indexOf("dyIndex") >= 0 &&
                                time[i].className.indexOf("pos") >= 0)
                                time[i].innerHTML = parseIndex(new Date().getDate())
                            
                            // Full Calender Date and Time
                            if (time[i].className.indexOf("fullDate") >= 0)
                                time[i].innerHTML = Date()
                            
                            // Hour
                            if (time[i].className.indexOf("hr") >= 0) {
                                // The HTML is in double digits
                                if (new Date().getHours().toString()[1] == undefined)
                                    time[i].innerHTML = "0" + new Date().getHours()

                                else
                                    time[i].innerHTML = new Date().getHours()
                            }

                            // Minutes
                            if (time[i].className.indexOf("min") >= 0) {
                                if (new Date().getMinutes().toString()[1] == undefined)
                                    time[i].innerHTML = "0" + new Date().getMinutes()
                                else
                                    time[i].innerHTML = new Date().getMinutes()
                            }

                            // Month
                            if (time[i].className.indexOf("mth") >= 0) {
                                if (Date().toString().indexOf("Jan") >= 0)
                                    time[i].innerHTML = "January"
                                
                                if (Date().toString().indexOf("Feb") >= 0)
                                    time[i].innerHTML = "February"
                                
                                if (Date().toString().indexOf("Mar") >= 0)
                                    time[i].innerHTML = "March"
                                
                                if (Date().toString().indexOf("Apr") >= 0)
                                    time[i].innerHTML = "April"
                                
                                if (Date().toString().indexOf("May") >= 0)
                                    time[i].innerHTML = "May"
                                
                                if (Date().toString().indexOf("Jun") >= 0)
                                    time[i].innerHTML = "June"
                                
                                if (Date().toString().indexOf("Jul") >= 0)
                                    time[i].innerHTML = "July"
                                
                                if (Date().toString().indexOf("Aug") >= 0)
                                    time[i].innerHTML = "August"
                                
                                if (Date().toString().indexOf("Sep") >= 0)
                                    time[i].innerHTML = "September"
                                
                                if (Date().toString().indexOf("Oct") >= 0)
                                    time[i].innerHTML = "October"
                                
                                if (Date().toString().indexOf("Nov") >= 0)
                                    time[i].innerHTML = "November"
                                
                                if (Date().toString().indexOf("Dec") >= 0)
                                    time[i].innerHTML = "December"
                            }

                            // Month Number
                            if (time[i].className.indexOf("mthIndex") >= 0)
                                time[i].innerHTML = new Date().getMonth() + 1

                            // Month Number with Postfix
                            if (time[i].className.indexOf("mthIndex") >= 0 &&
                                time[i].className.indexOf("pos") >= 0)
                                time[i].innerHTML = parseIndex(new Date().getMonth() + 1)

                            // Seconds
                            if (time[i].className.indexOf("sec") >= 0) {
                                if (new Date().getSeconds().toString()[1] == undefined)
                                    time[i].innerHTML = "0" + new Date().getSeconds()
                                else
                                    time[i].innerHTML = new Date().getSeconds()
                            }

                            // Year
                            if (time[i].className.indexOf("yr") >= 0)
                                time[i].innerHTML = new Date().getFullYear()
                        }
                    }
                    timeHTML()
                    setInterval(timeHTML, 1000)
                }, 50)

    /* Web Applications
            --- NOTE ---
                The timeout here gives all applications
                (Javascript and non-Javascript implemented)
                time to fully load and correct on the page.
    */
    setTimeout(function() {
        // Accordion JS
        var accordion = document.querySelectorAll(".accr"),
            // Accordion Header
            accordionHeader = document.querySelectorAll(".accr > .accr-h"),
            // Accordion Screen
            accordionContent = document.querySelectorAll(".accr > .accr-c"),
            // Accordion ID
            accordionIdentity = [  ]
            
            // Index all accordions
            for (i = 0; i < accordion.length; i++) {
                // Close the accordion
                accordion[i].open = false
            
                // Create a unique ID for each accordion
                accordionIdentity[i] = "#" + Math.random().toString().slice(2)
            
                // Index all accordions
                accordion[i].setAttribute("data-index", i)
                accordion[i].setAttribute("data-id", accordionIdentity[i])
            
                // Reset the "open" attribute
                if (accordion[i].hasAttribute("open") && accordion[i].tagName == "DETAILS") {
                    accordion[i].removeAttribute("open")
                    accordion[i].setAttribute("data-open", "")
                }
            
                // Open the accordion if the attribute "data-open" is defined
                if (accordion[i].hasAttribute("data-open")) accordion[i].open = true
            }
            
            // Index all accordion headers
            for (i = 0; i < accordionHeader.length; i++) {
                if (!accordionHeader[i].parentNode.hasAttribute("default"))
                    accordionHeader[i].addEventListener("click", openAccordion)

                accordionHeader[i].setAttribute("data-index", i)
            }
            
            // Index all accordion content
            for (i = 0; i < accordionContent.length; i++) {
                accordionContent[i].setAttribute("data-index", i)
                if (accordionContent[i].parentNode.open || accordionContent[i].parentNode.hasAttribute("data-open"))
                    accordionContent[i].style.display = "block"
                else
                    accordionContent[i].style.display = "none"
            }
            
            // Open the accordion
            function openAccordion() {
                if (!bin) {
                    document.querySelectorAll(this.parentNode.tagName.toLowerCase() + '.accr[data-id="' + this.parentNode.getAttribute("data-id") + '"] > .accr-c[data-index="' + this.getAttribute("data-index") + '"]')[0].parentNode.open = true
                    document.querySelectorAll(this.parentNode.tagName.toLowerCase() + '.accr[data-id="' + this.parentNode.getAttribute("data-id") + '"] > .accr-c[data-index="' + this.getAttribute("data-index") + '"]')[0].parentNode.setAttribute("data-open", "")
                    document.querySelectorAll(this.parentNode.tagName.toLowerCase() + '.accr[data-id="' + this.parentNode.getAttribute("data-id") + '"] > .accr-c[data-index="' + this.getAttribute("data-index") + '"]')[0].style.display = "block"
                } else {
                    document.querySelectorAll(this.parentNode.tagName.toLowerCase() + '.accr[data-id="' + this.parentNode.getAttribute("data-id") + '"] > .accr-c[data-index="' + this.getAttribute("data-index") + '"]')[0].parentNode.open = false
                    document.querySelectorAll(this.parentNode.tagName.toLowerCase() + '.accr[data-id="' + this.parentNode.getAttribute("data-id") + '"] > .accr-c[data-index="' + this.getAttribute("data-index") + '"]')[0].parentNode.removeAttribute("data-open")
                    document.querySelectorAll(this.parentNode.tagName.toLowerCase() + '.accr[data-id="' + this.parentNode.getAttribute("data-id") + '"] > .accr-c[data-index="' + this.getAttribute("data-index") + '"]')[0].style.display = "none"
                }

                bin = !bin
            }
            
            // For Javascript-functioned accordions
            setInterval(function() {
                for (i = 0; i < accordion.length; i++) {
                    // If the accordion has the "data-open" attribute, it opens
                    if (accordion[i].open || accordion[i].hasAttribute("data-open")) 
                        if (accordion[i].childNodes[3].classList.value.indexOf("accr-c") >= 0)
                            accordion[i].childNodes[3].style.display = "block"
                        else if ((accordion[i].childNodes[1].classList.value.indexOf("accr-c") >= 0))
                            accordion[i].childNodes[1].style.display = "block"
                        else
                            for (j = 0; j < accordion[i].childNodes.length; j++)
                                if (accordion[i].childNodes[j].tagName != undefined)
                                    if (accordion[i].childNodes[j].classList.value.indexOf("accr-c") >= 0)
                                        accordion[i].childNodes[j].style.display = "block"
                    // If the accordion does not have the "data-open" attribute, it closes
                    else
                        if (accordion[i].childNodes[3].classList.value.indexOf("accr-c") >= 0)
                            accordion[i].childNodes[3].style.display = "none"
                        else if ((accordion[i].childNodes[1].classList.value.indexOf("accr-c") >= 0))
                            accordion[i].childNodes[1].style.display = "none"
                        else
                            for (j = 0; j < accordion[i].childNodes.length; j++)
                                if (accordion[i].childNodes[j].tagName != undefined)
                                    if (accordion[i].childNodes[j].classList.value.indexOf("accr-c") >= 0)
                                        accordion[i].childNodes[j].style.display = "none"
                }
            }, 1000)

        // Carousel JS 
        var carousel = document.getElementsByClassName("crsl"),
            // Carousel Buttons
            carouselButtonsLeft, carouselButtonsRight,
            // Carousel Indicators
            carouselIndicators,
            // (General) Carousel Counter
            carouselCounter = 0,
            // (Individual) Carousel Counter
            carouselElementCounter = [  ]
            
            for (i = 0; i < carousel.length; i++) {
                // Index each carousel and carousel button
                carousel[i].setAttribute("data-index", i)

                // Index the carousel slides
                if (carousel[i].childNodes[0])
                    for (j = 0; j < carousel[i].childNodes.length; j++)
                        if (carousel[i].childNodes[j].tagName != undefined)
                            carousel[i].childNodes[j].setAttribute("data-key", j)
                
                // If "data-controls" attribute is enabled, append a custom button
                if (carousel[i].hasAttribute("data-controls"))
                    carousel[i].insertAdjacentHTML('afterend', '<button class="crsl-btn-l"> < </button>')
                
                // If "data-duration" attribute is disabled
                if (!carousel[i].hasAttribute("data-duration"))
                    carousel[i].setAttribute("data-duration", 0)
                
                // If "data-duration" attribute is enabled
                if (carousel[i].hasAttribute("data-duration"))
                    for (j = 0; j < document.querySelectorAll(".crsl[data-index] > *:not(span)").length; j++)
                        document.querySelectorAll(".crsl[data-index] > *:not(span)")[j].style.animationDuration = "" +
                            (document.querySelectorAll(".crsl[data-index] > *:not(span)")[j].parentNode.getAttribute("data-duration") + "s").toString()
                
                // If "data-interval" attribute is disabled
                if (!carousel[i].hasAttribute("data-interval"))
                    carousel[i].setAttribute("data-interval", 3)
                
                // If "data-navigation" attribute is enabled
                if (carousel[i].hasAttribute("data-navigation")) {
                    /* --- NOTE ---
                            Give the carousel buttons time to load if they are present.
                    */
                    setTimeout(function() {
                        for (j = 0; j < carousel[i].childNodes.length; j++)
                            if (carousel[i].childNodes[j].tagName != undefined)
                                carousel[i].insertAdjacentHTML('afterend', '<input class="crsl-nav" data-id="' + i + '" data-list="' + j + '" type="checkbox">')
                    }, 750)
                }

                // If "data-slide" attribute is enabled
                if (carousel[i].hasAttribute("data-slide"))
                    for (j = 0; j < document.querySelectorAll(".crsl[data-index] > *:not(span)").length; j++)
                        document.querySelectorAll(".crsl[data-index] > *:not(span)")[j].style.animationName = "" +
                            document.querySelectorAll(".crsl[data-index] > *:not(span)")[j].parentNode.getAttribute("data-slide") + "_carousel"
                
                // If "data-marquee" attribute is enabled
                if (carousel[i].hasAttribute("data-marquee"))
                    setInterval(carouselRight, 1000)

                // Set/ script a focus status for carousels
                document.body.onclick = function() {
                    // Un-select all carousels
                    for (i = 0; i < carousel.length; i++)
                        carousel[i].isFocused = false

                    // Select the carousel
                        // If what was clicked is a carousel, focus on it
                        if (window.event.target.classList.value.indexOf("crsl") >= 0)
                            window.event.target.isFocused = true
                        // If what was clicked's parent is a carousel, focus on it
                        else if (window.event.target.parentNode.classList.value.indexOf("crsl") >= 0)
                            window.event.target.parentNode.isFocused = true
                        // If what was clicked's parent's parent is a carousel, focus on it
                        else if (window.event.target.parentNode.parentNode.classList.value.indexOf("crsl") >= 0)
                            window.event.target.parentNode.parentNode.isFocused = true
                }
            }

            // Stylize the carousel if it is "focused"
            setInterval(function() {
                for (i = 0; i < carousel.length; i++)
                    if (carousel[i].isFocused)
                        carousel[i].setAttribute("psd-focus", "")
                    else
                        carousel[i].removeAttribute("psd-focus")
            }, 100)

            // Accept keyboard input for toggling slides
            document.body.addEventListener("keydown", carouselKey)
            document.body.addEventListener("keypress", carouselKey)

            // Set/ script the buttons
                // Catch the left carousel buttons
                carouselButtonsLeft = document.querySelectorAll(".crsl + .crsl-btn-l")
                    for (i = 0; i < carouselButtonsLeft.length; i++) {
                        carouselButtonsLeft[i].addEventListener("click", carouselL)
                        carouselButtonsLeft[i].innerHTML = carousel[i].getAttribute("data-left-button") || "<"
                        carouselButtonsLeft[i].insertAdjacentHTML('afterend', '<button class="crsl-btn-r"> > </button>')
                        carouselButtonsLeft[i].setAttribute("data-index", i)
                    }
                
                // Catch the right carousel buttons
                carouselButtonsRight = document.querySelectorAll(".crsl-btn-l + .crsl-btn-r")
                    for (i = 0; i < carouselButtonsRight.length; i++) {
                        carouselButtonsRight[i].addEventListener("click", carouselR)
                        carouselButtonsRight[i].innerHTML = carousel[i].getAttribute("data-right-button") || ">"
                        carouselButtonsRight[i].setAttribute("data-index", i)
                    }

            // Set/ script the indicators
                // Catch the navigation elements
                setTimeout(function() {
                    carouselIndicators = document.querySelectorAll(".crsl-nav[data-list]")

                    for (i = 0; i < carouselIndicators.length; i++)
                        carouselIndicators[i].addEventListener("click", carouselToggle)
                }, 825)
            
            /* --- NOTE ---
                Append a "data-count" attribute to count the seconds and
                add new properties to the carousel array.
            */
            for (i = 0; i < carousel.length; i++)
                carouselElementCounter[i] = 0
            
            // The counter property
            setInterval(function() {
                for (i = 0; i < carousel.length; i++) {
                    // Increment the values of each property
                    carouselElementCounter[i]++
                    // Append the attribute
                    carousel[i].setAttribute("data-count", carouselElementCounter[i])
                }
            }, 1000)

            // Toggle the selected slide on the carousel
            function carouselToggle() {
                var carouselContent = document.querySelectorAll('.crsl[data-index="' + this.getAttribute("data-index") + '"] > *:not(span)'),
                    carouselSlide = document.querySelectorAll('.crsl[data-index="' + this.getAttribute("data-id") + '"] > *:not(span)[data-key="' + this.getAttribute("data-list") + '"]')
                    
                for (i = 0; i < carouselContent.length; i++)
                    carouselContent[i].style.display = "none"

                carouselSlide[0].style.display = "block"
                carouselSlide[0].parentNode.insertBefore(
                    carouselSlide[0], 
                    carouselSlide[0].parentNode.childNodes[1]
                )
            }
            
            // Reverse the rotary
            function carouselLeft() {
                // Call this function when the "data-count" attribute matches the ("data-duration" + "data-interval") attribute
                for (i = 0; i < carousel.length; i++) {
                    if (carousel[i].getAttribute("data-count") == parseInt(parseInt(carousel[i].getAttribute("data-duration")) + parseInt(carousel[i].getAttribute("data-interval")))) {
                        // Run the main function
                        for (j = 0; j < document.querySelectorAll('.crsl[data-index="' + i + '"] > *:not(span)').length; j++)
                            document.querySelectorAll('.crsl[data-index="' + i + '"] > *:not(span)')[j].style.display = "none"
                        
                        document.querySelectorAll('.crsl[data-index="' + i + '"] > *:not(span)')[0].style.display = "block"

                        document.querySelectorAll('.crsl[data-index="' + i + '"] > *:not(span)')[0].parentNode.insertBefore(
                            document.querySelectorAll('.crsl[data-index="' + i + '"] > *:not(span)')[document.querySelectorAll('.crsl[data-index="' + i + '"] > *:not(span)').length - 1],
                            document.querySelectorAll('.crsl[data-index="' + i + '"] > *:not(span)')[0]
                        )
                    
                        // Reset the "data-count" attribute for the specified carousel
                        carouselElementCounter[i] = 0
                        carousel[i].setAttribute("data-count", 0)
                    }
                }
            }
            // Reverse a rotary
            function carouselL() {
                var carouselLContent = document.querySelectorAll('.crsl[data-index="' + this.getAttribute("data-index") + '"] > *:not(span)')
                
                for (i = 0; i < carouselLContent.length; i++)
                    carouselLContent[i].style.display = "none"
                
                carouselLContent[0].style.display = "block"
                carouselLContent[0].parentNode.insertBefore(carouselLContent[carouselLContent.length - 1], carouselLContent[0])
            }

            // Play the rotary
            function carouselRight() {
                // Call this function when the "data-count" attribute matches the ("data-duration" + "data-interval") attribute
                for (i = 0; i < carousel.length; i++) {
                    if (carousel[i].getAttribute("data-count") == parseInt(parseInt(carousel[i].getAttribute("data-duration")) + parseInt(carousel[i].getAttribute("data-interval")))) {
                        // Run the main function
                        for (j = 0; j < document.querySelectorAll('.crsl[data-index="' + i + '"] > *:not(span)').length; j++)
                            document.querySelectorAll('.crsl[data-index="' + i + '"] > *:not(span)')[j].style.display = "none"
                        
                        document.querySelectorAll('.crsl[data-index="' + i + '"] > *:not(span)')[document.querySelectorAll('.crsl[data-index="' + i + '"] > *:not(span)').length - 1].style.display = "block"
                        document.querySelectorAll('.crsl[data-index="' + i + '"] > *:not(span)')[0].parentNode.appendChild(document.querySelectorAll('.crsl[data-index="' + i + '"] > *:not(span)')[0])

                        // Reset the "data-count" attribute for the specified carousel
                        carouselElementCounter[i] = 0
                        carousel[i].setAttribute("data-count", 0)
                    }
                }
            }

            // Play a rotary
            function carouselR() {
                var carouselLContent = document.querySelectorAll('.crsl[data-index="' + this.getAttribute("data-index") + '"] > *:not(span)')
                
                for (i = 0; i < carouselLContent.length; i++)
                    carouselLContent[i].style.display = "none"
                
                carouselLContent[0].style.display = "block"
                carouselLContent[0].parentNode.appendChild(carouselLContent[0])
            }

            // Toggle the rotary via keyboard input when the carousel is "focused"
            function carouselKey() {
                // If the Left Arrow Key is pressed, toggle the focused carousel's slides
                if (event.keyCode == 37) {
                    // Make a variable
                    var once = false

                    for (i = 0; i < carousel.length; i++)
                        // If the carousel is focused
                        if (carousel[i].isFocused) {
                            // Hide all carousel children
                            for (j = 0; j < carousel[i].childNodes.length; j++)
                                // Index all carousel children
                                if (carousel[i].childNodes[j].tagName != undefined)
                                    carousel[i].childNodes[j].style.display = "none"

                            // Index all carousel children
                            for (j = 0; j < carousel[i].childNodes.length; j++)
                                // Index all carousel elements
                                if (carousel[i].childNodes[j].tagName != undefined)
                                    // Use the variable to only access the first child of the carousel
                                    if (!once) {
                                        carousel[i].childNodes[j].style.display = "block"
                                        carousel[i].childNodes[0].parentNode.insertBefore(carousel[i].childNodes[carousel[i].childNodes.length - 1], carousel[i].childNodes[0])

                                        once = true
                                    }
                        }
                }

                // If the Right Arrow Key is pressed, toggle the focused carousel's slides
                if (event.keyCode == 39) {
                    // Make a variable
                    var once = false

                    for (i = 0; i < carousel.length; i++)
                        // If the carousel is focused
                        if (carousel[i].isFocused) {
                            // Hide all carousel children
                            for (j = 0; j < carousel[i].childNodes.length; j++)
                                // Index all carousel children
                                if (carousel[i].childNodes[j].tagName != undefined)
                                    carousel[i].childNodes[j].style.display = "none"

                            // Index all carousel children
                            for (j = 0; j < carousel[i].childNodes.length; j++)
                                // Index all carousel elements
                                if (carousel[i].childNodes[j].tagName != undefined)
                                    // Use the variable to only access the first child of the carousel
                                    if (!once) {
                                        carousel[i].childNodes[j].style.display = "block"
                                        carousel[i].childNodes[0].parentNode.appendChild(carousel[i].childNodes[0])

                                        once = true
                                    }
                        }
                }
            }

        // Code Editor JS
        var codeEditor = document.getElementsByClassName("cd-edtr")
            // Index all editors
            for (i = 0; i < codeEditor.length; i++) {
                // Add the events
                codeEditor[i].ondblclick = function() {
                    // Convert to string
                    if (!bin) {
                        this.innerHTML = this.innerHTML.replace(/</gi, '&lt;').replace(/>/gi, '&gt;')
                        this.setAttribute("contenteditable", "true")
                        this.style.borderLeftColor = "#F70"
                    }
                    // Convert to HTML
                    else {
                        this.innerHTML = this.innerHTML.replace(/&lt;/gi, '<').replace(/&gt;/gi, '>')
                        this.removeAttribute("contenteditable")
                        this.style.borderLeftColor = "#00F"
                    }

                    bin = !bin
                }
                codeEditor[i].style.borderLeftColor = "#00F"
            }

        // Clone JS
        var copy = document.getElementsByTagName("copy"),
            cut = document.getElementsByTagName("cut"),
            cutHTML = [],
            paste = document.getElementsByTagName("paste")

            /* --- NOTE ---
                    Paste content referenced from a <copy> element
                    within a <paste> element.
            */
            for (i = 0; i < paste.length; i++)
                // Copy Command
                if (document.querySelectorAll("#" + paste[i].getAttribute("ref"))[0].tagName == "COPY")
                    paste[i].innerHTML = document.querySelectorAll("copy#" + paste[i].getAttribute("ref"))[0].innerHTML
                // Cut Command
                else
                    paste[i].innerHTML = document.querySelectorAll("cut#" + paste[i].getAttribute("ref"))[0].innerHTML

            /* --- NOTE ---
                    Delete "cut" content.
            */
            for (i = 0; i < cut.length; i++)
                document.querySelectorAll("cut#" + paste[i].getAttribute("ref"))[0].parentNode.removeChild(document.querySelectorAll("cut#" + paste[i].getAttribute("ref"))[0])

        // Dropdown JS
            // Dropdown Header
            var dropdownHeader = document.getElementsByClassName("drpdwn"),
            // Dropdown Content 
                dropdownContent = document.querySelectorAll("[data-drpdwn]"),
            // Dropdown Content CSS Display Value
                dropdownContentCSSDisplay = {  }

            // Index all contents
            for (i = 0; i < dropdownContent.length; i++) {
                // Store the content's CSS display
                dropdownContentCSSDisplay[dropdownContent[i].getAttribute("data-drpdwn").toString()] = window.getComputedStyle(dropdownContent[i]).getPropertyValue("display")

                // Hide the content
                dropdownContent[i].style.display = "none"
            }

            // Hide the content
            function hideDropdownMenu() {
                if (document.querySelectorAll('[data-drpdwn="' + window.event.target.getAttribute("id") + '"]')[0])
                    document.querySelectorAll('[data-drpdwn="' + window.event.target.getAttribute("id") + '"]')[0].style.display = "none"
            }
            // Show the content
            function showDropdownMenu() {
                if (document.querySelectorAll('[data-drpdwn="' + window.event.target.getAttribute("id") + '"]')[0])
                    document.querySelectorAll('[data-drpdwn="' + window.event.target.getAttribute("id") + '"]')[0].style.display = dropdownContentCSSDisplay[document.querySelectorAll('[data-drpdwn="' + window.event.target.getAttribute("id") + '"]')[0].getAttribute("data-drpdwn")]
            }

            // Index all headers
            for (i = 0; i < dropdownHeader.length; i++)
                /* --- NOTE ---
                        How the following events are going to
                        take place are dependent on the
                        header's "data-event" attribute value
                */
                // Click event
                if (dropdownHeader[i].getAttribute("data-event") == "on")
                    // Add the event
                    dropdownHeader[i].onclick = function() {
                        // Show the corresponding content
                        if (!bin) showDropdownMenu()
                        // Hide the corresponding content
                        else hideDropdownMenu()

                        bin = !bin
                    }

                // Mouseover event
                else if (dropdownHeader[i].getAttribute("data-event") == "over")
                    // Add the event
                    dropdownHeader[i].onmouseover = function() {
                        // Show the corresponding content
                        if (!bin) showDropdownMenu()
                        // Hide the corresponding content
                        else hideDropdownMenu()

                        bin = !bin
                    }

                // Mouseover and mouseleave event
                else if (dropdownHeader[i].getAttribute("data-event") == "over_toggle") {
                    // Add the event
                    dropdownHeader[i].onmouseover = function() {
                        // Show the corresponding content
                        showDropdownMenu()
                    }
                    dropdownHeader[i].onmouseleave = function() {
                        // Hide the corresponding content
                        hideDropdownMenu()
                    }
                }

        // Media JS
        var media = document.getElementsByClassName("med")
        
        if (media[0]) {
            // Run this function for all <audio> and <video> consoles
            for (i = 0; i < media.length; i++) {
                if (media[i].tagName == "AUDIO" || media[i].tagName == "VIDEO") {
                    /* --- NOTE ---
                            Update the media source
                                and
                            give time for the Javascript to run
                    */
                    setTimeout(function() {
                        // Re-index all consoles
                        for (i = 0; i < media.length; i++)
                            if (media[i].tagName == "AUDIO" || media[i].tagName == "VIDEO")
                                // Index all console element children
                                for (j = 0; j < media[i].childNodes.length; j++)
                                    /* --- NOTE ---
                                        If
                                            it is a <source> element, replace the console's "src"
                                            attribute with the <source>'s "src" attribute
                                                and
                                            the console's media duration is Not a Number,
                                            skip over that <source> to the next.
                                    */
                                    if (media[i].childNodes[j].tagName == "SOURCE"
                                        && media[i].duration != NaN)

                                        media[i].setAttribute("src", media[i].childNodes[j].getAttribute("src"))
                    }, 1250)
           
                    // Create the console controller
                    media[i].insertAdjacentHTML("afterend", "<nav> </nav>")
           
                    // Index every media console
                    media[i].setAttribute("data-index", i)
           
                    // Remove the "controls" attribute
                    if (media[i].hasAttribute("controls"))
                        media[i].removeAttribute("controls")
                }
            }
            // Media Controller (Catch the controller)
            var mediaController = document.querySelectorAll(".med + nav")
            
            // Append the controls for the controller
            for (i = 0; i < mediaController.length; i++) {
                mediaController[i].innerHTML = (
                    // Pause/ Play Button
                    '<input data-vid-play type="button" value="&blacktriangleright;">' +
                    // Stop Button
                    '<input data-vid-stop type="button" value="&blacksquare;">' +
                    // Playback Current Time
                    '<div data-vid-currenttime> 00:00:00 </div>' +
                    // Playback Duration
                    '<div data-vid-duration> 00:00:00 </div>' +
                    // Playback Seeker
                    '<input data-vid-seek min="0" step="1" type="range" value="0">' +
                    // Volume Button
                    '<input data-vid-vol type="button" value="&lescc;">' +
                    // Mute/ Volume Range
                    '<input data-vid-volRange max="100" min="0" step="1" type="range" value="100">' +
                    // Download Button
                    '<a data-vid-dwnld download> &darr; </a>' +
                    // Slow Button
                    '<input data-vid-slow type="button" value="&#8672;">' +
                    // Fast Button
                    '<input data-vid-fast type="button" value="&#8674;">' +
                    // Playback Rate
                    '<div data-vid-rate> </div>' +
                    // Fullscreen Button
                    '<input data-vid-flscrn type="button" value="&#9635;">'
                )

                // Index every controller
                mediaController[i].setAttribute("data-index", i)
            }

            // Index every controller component
            for (i = 0; i < document.querySelectorAll(".med + nav > *").length; i++)
                document.querySelectorAll(".med + nav > *")[i].setAttribute("data-index", document.querySelectorAll(".med + nav > *")[i].parentNode.getAttribute("data-index"))
            
            // Pause/ Play Button
            var mediaControllerPlay = document.querySelectorAll(".med + nav > [data-vid-play]")
                // Add the events
                for (i = 0; i < mediaControllerPlay.length; i++)
                    mediaControllerPlay[i].addEventListener("click", playMedia)
                // Play or pause the console playback
                function playMedia() {
                    if (!bin)
                        media[this.getAttribute("data-index")].play()
                    else
                        media[this.getAttribute("data-index")].pause()

                    bin = !bin
                }
            
            // Stop Button
            var mediaControllerStop = document.querySelectorAll(".med + nav > [data-vid-stop]")
                // Stop the console playback
                for (i = 0; i < mediaControllerStop.length; i++)
                    mediaControllerStop[i].onclick = function() {
                        media[this.getAttribute("data-index")].load()
                    }
            
            // Playback Current Time
            var mediaControllerCurrentTime = document.querySelectorAll(".med + nav > [data-vid-currenttime]")
            
            // Playback Duration
            var mediaControllerDuration = document.querySelectorAll(".med + nav > [data-vid-duration]")
                
                setInterval(function() {
                    for (i = 0; i < mediaControllerCurrentTime.length; i++) {
                        // Current Time in Hours:Minutes:Seconds
                        var mediaControllerCurrentTimeHTMLHours = 0,
                            mediaControllerDurationHTMLHours = 0,
                            
                            mediaControllerCurrentTimeHTMLMinutes = 0,
                            mediaControllerDurationHTMLMinutes = 0,
                            
                            mediaControllerCurrentTimeHTMLSeconds = parseInt(document.querySelectorAll(
                                '.med[data-index="' + mediaControllerCurrentTime[i].getAttribute("data-index") + '"]')[0].currentTime
                            ),
                            mediaControllerDurationHTMLSeconds = parseInt(document.querySelectorAll(
                                '.med[data-index="' + mediaControllerCurrentTime[i].getAttribute("data-index") + '"]')[0].duration
                            )


                        // For every 60 seconds (or minutes), add 1 minute (or hour)
                        for (mediaControllerCurrentTimeHTMLSeconds;
                            mediaControllerCurrentTimeHTMLSeconds >= 3600;
                            mediaControllerCurrentTimeHTMLSeconds -= 3600)
                            mediaControllerCurrentTimeHTMLHours++;
                        for (mediaControllerDurationHTMLSeconds;
                            mediaControllerDurationHTMLSeconds >= 3600;
                            mediaControllerDurationHTMLSeconds -= 3600)
                            mediaControllerDurationHTMLHours++;

                        for (mediaControllerCurrentTimeHTMLSeconds;
                            mediaControllerCurrentTimeHTMLSeconds >= 60;
                            mediaControllerCurrentTimeHTMLSeconds -= 60)
                            mediaControllerCurrentTimeHTMLMinutes++;
                        for (mediaControllerDurationHTMLSeconds;
                            mediaControllerDurationHTMLSeconds >= 60;
                            mediaControllerDurationHTMLSeconds -= 60)
                            mediaControllerDurationHTMLMinutes++;


                        // Each value must be double-digit (octal)
                        if (mediaControllerCurrentTimeHTMLHours.toString()[1] == undefined)
                            mediaControllerCurrentTimeHTMLHours = "0" + mediaControllerCurrentTimeHTMLHours
                        if (mediaControllerCurrentTimeHTMLMinutes.toString()[1] == undefined)
                            mediaControllerCurrentTimeHTMLMinutes = "0" + mediaControllerCurrentTimeHTMLMinutes
                        if (mediaControllerCurrentTimeHTMLSeconds.toString()[1] == undefined)
                            mediaControllerCurrentTimeHTMLSeconds = "0" + mediaControllerCurrentTimeHTMLSeconds

                        if (mediaControllerDurationHTMLHours.toString()[1] == undefined)
                            mediaControllerDurationHTMLHours = "0" + mediaControllerDurationHTMLHours
                        if (mediaControllerDurationHTMLMinutes.toString()[1] == undefined)
                            mediaControllerDurationHTMLMinutes = "0" + mediaControllerDurationHTMLMinutes
                        if (mediaControllerDurationHTMLSeconds.toString()[1] == undefined)
                            mediaControllerDurationHTMLSeconds = "0" + mediaControllerDurationHTMLSeconds


                        // Append the parsed HTML
                        mediaControllerCurrentTime[i].innerHTML = (
                            mediaControllerCurrentTimeHTMLHours + ":" +
                            mediaControllerCurrentTimeHTMLMinutes + ":" +
                            mediaControllerCurrentTimeHTMLSeconds
                        ).toString().replace(/NaN/g, "00")
                        
                        mediaControllerDuration[i].innerHTML = (
                            mediaControllerDurationHTMLHours + ":" +
                            mediaControllerDurationHTMLMinutes + ":" +
                            mediaControllerDurationHTMLSeconds
                        ).toString().replace(/NaN/g, "00")
                    }
                }, 1)
            
            // Playback Seek
            var mediaControllerSeek = document.querySelectorAll(".med + nav > [data-vid-seek]")
                
            // Give time for the consoles to load
            setTimeout(function() {
                for (i = 0; i < mediaControllerSeek.length; i++) {
                    // Add the events
                    mediaControllerSeek[i].addEventListener("change", seekMedia)
                    mediaControllerSeek[i].addEventListener("input", seekMedia)
                    
                    // Scale the "max" attribute to the console playback duration
                    mediaControllerSeek[i].setAttribute("max", parseInt(media[i].duration))
                }
                
                // Change the current time of the playback on the value of the seeker
                function seekMedia() {
                    media[this.getAttribute("data-index")].currentTime = this.value
                }
                
                // Update the value of the seeker
                setInterval(function() {
                    for (i = 0; i < mediaControllerSeek.length; i++) {
                        mediaControllerSeek[i].setAttribute("value", parseInt(media[i].currentTime))
                        mediaControllerSeek[i].value = media[i].currentTime
                    }
                }, 1)
            }, 750)
            
            // Mute/ Volume Button
            var mediaControllerVolume = document.querySelectorAll(".med + nav > [data-vid-vol]"),
                mediaVolume = [  ]
            
            // Store the volume value of the console
            for (i = 0; i < mediaControllerVolume.length; i++) {
                mediaControllerVolume[i].addEventListener("click", volMedia)
                mediaVolume[i] = media[i].volume
            }
            
            function volMedia() {
                // Mute or restore the volume
                if (!bin) {
                    // Store the previous volume value of the console
                    mediaVolume[this.getAttribute("data-index")] = media[this.getAttribute("data-index")].volume
                    // Update the media volume to 0
                    media[this.getAttribute("data-index")].volume = 0
                } else {
                    // Update the media volume the formerly stored value
                    media[this.getAttribute("data-index")].volume = mediaVolume[this.getAttribute("data-index")]
                }

                bin = !bin
            }

            // Volume Range
            var mediaControllerVolumeRange = document.querySelectorAll(".med + nav > [data-vid-volRange]")
                // Give time for the consoles to load
                setTimeout(function() {
                    // Add the events
                    for (i = 0; i < mediaControllerVolumeRange.length; i++) {
                        mediaControllerVolumeRange[i].addEventListener("change", volRangeMedia)
                        mediaControllerVolumeRange[i].addEventListener("input", volRangeMedia)
                    }
                    
                    // Change the volume of the playback on the value of the seeker
                    function volRangeMedia() {
                        media[this.getAttribute("data-index")].volume = (this.value / 100)
                    }
                    
                    // Update the value of the seeker
                    setInterval(function() {
                        for (i = 0; i < mediaControllerVolumeRange.length; i++) {
                            mediaControllerVolumeRange[i].setAttribute("value", (media[i].volume * 100))
                            mediaControllerVolumeRange[i].value = (media[i].volume * 100)
                        }
                    }, 1)
                }, 750)
        
            // Download Button
            var mediaControllerDownload = document.querySelectorAll(".med + nav > [data-vid-dwnld]")
                // Make a download button from the media "src" path
                for (i = 0; i < mediaControllerDownload.length; i++)
                    if (media[i].getAttribute("src") != undefined)
                        mediaControllerDownload[i].setAttribute("href", media[i].getAttribute("src"))
            
            // Playback Rate
            var mediaPlaybackRate = [  ]
            
            // Slow Button
            var mediaControllerSlow = document.querySelectorAll(".med + nav > [data-vid-slow]")
                // Add the events
                for (i = 0; i < mediaControllerSlow.length; i++) {
                    // Store the media playback rate
                    mediaPlaybackRate[i] = media[i].playbackRate

                    // Slow down the playback rate
                    mediaControllerSlow[i].onclick = function() {
                        media[this.getAttribute("data-index")].playbackRate = (mediaPlaybackRate[this.getAttribute("data-index")] - .25)
                        mediaPlaybackRate[this.getAttribute("data-index")] = media[this.getAttribute("data-index")].playbackRate
                    }
                }
            
            // Fast Button
            var mediaControllerFast = document.querySelectorAll(".med + nav > [data-vid-fast]")
                // Add the events
                for (i = 0; i < mediaControllerFast.length; i++) mediaControllerFast[i].onclick = function() {
                    // Speed up the playback rate
                    media[this.getAttribute("data-index")].playbackRate = (mediaPlaybackRate[this.getAttribute("data-index")] + .25)
                    
                    // Update the playback rate
                    mediaPlaybackRate[this.getAttribute("data-index")] = media[this.getAttribute("data-index")].playbackRate
                }
            
            // Playback Rate
            var mediaControllerRate = document.querySelectorAll(".med + nav > [data-vid-rate]")
                setInterval(function() {
                    for (i = 0; i < mediaControllerRate.length; i++)
                        mediaControllerRate[i].innerHTML = "&times;" + media[i].playbackRate
                }, 1)

            // Fullscreen Button
            var mediaControllerFullscreen = document.querySelectorAll(".med + nav > [data-vid-flscrn]")
                
            for (i = 0; i < mediaControllerFullscreen.length; i++)
                mediaControllerFullscreen[i].addEventListener("click", fullMedia)

            function fullMedia() {
                // Only support <video> elements
                if (media[this.getAttribute("data-index")].tagName == "VIDEO") {
                    if (!bin) {
                        // Append the "data-fullscreen" attribute
                        media[this.getAttribute("data-index")].setAttribute("data-fullscreen", "")

                        // Set the console to fullscreen
                        if ((document.fullScreenElement && document.fullScreenElement !== null) ||
                            (!document.mozFullScreen && !document.webkitIsFullScreen))
                            if (media[this.getAttribute("data-index")].requestFullScreen)
                                media[this.getAttribute("data-index")].requestFullScreen()
                        
                            else if (media[this.getAttribute("data-index")].mozRequestFullScreen)
                                media[this.getAttribute("data-index")].mozRequestFullScreen()
                        
                            else if (media[this.getAttribute("data-index")].webkitRequestFullScreen)
                                media[this.getAttribute("data-index")].webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT)
                    } else {
                        // Append the "data-fullscreen" attribute
                        media[this.getAttribute("data-index")].removeAttribute("data-fullscreen")

                        // Set the console to normal view
                        if (document.cancelFullScreen)
                            document.cancelFullScreen()
                        
                        else if (document.mozCancelFullScreen)
                            document.mozCancelFullScreen()
                        
                        else if (document.webkitCancelFullScreen)
                            document.webkitCancelFullScreen()
                    }

                    bin = !bin
                }
            }
        }
        
        // Tab Panel JS  (formally Tab Group JS)
        var tabGroup = document.querySelectorAll(".tb"),
            // Tab Options (content parsing)
            tabGroupHeaders = document.querySelectorAll(".tb > .tb-o > *"),
            // Tab Contents/ Sections
            tabGroupContents = document.querySelectorAll(".tb > .tb-c > *")

        // Index every tab panel
        for (i = 0; i < tabGroup.length; i++)
            tabGroup[i].setAttribute("data-index", i)
        
        // Index all tab panel headers and their components based off their parent
        for (i = 0; i < tabGroupHeaders.length; i++) {
            tabGroupHeaders[i].addEventListener("click", showContent)
            tabGroupHeaders[i].parentNode.setAttribute("data-index", tabGroupHeaders[i].parentNode.parentNode.getAttribute("data-index"))
            tabGroupHeaders[i].setAttribute("data-index", tabGroupHeaders[i].parentNode.getAttribute("data-index"))
        }
        
        // Index all tab panel contents and their sections based off their parent
        for (i = 0; i < tabGroupContents.length; i++) {
            tabGroupContents[i].parentNode.setAttribute("data-index", tabGroupContents[i].parentNode.parentNode.getAttribute("data-index"))
            tabGroupContents[i].setAttribute("data-index", tabGroupContents[i].parentNode.getAttribute("data-index"))
        }

        function showContent() {
            if (this.hasAttribute("data-key")) {
                // For all Tab Group Contents
                for (i = 0; i < document.querySelectorAll(this.parentNode.tagName.toLowerCase() + '.tb[data-index="' + this.getAttribute("data-index") + '"] > .tb-c > *').length; i++)
                    document.querySelectorAll(this.parentNode.tagName.toLowerCase() + '.tb[data-index="' + this.getAttribute("data-index") + '"] > .tb-c > *')[i]
                
                // For the same Tab Group Content with the same "data-key"
                if (document.querySelectorAll(this.parentNode.tagName.toLowerCase() + '.tb > .tb-c > *[data-index="' + this.getAttribute("data-index") + '"]')[0])
                if (document.querySelectorAll(this.parentNode.tagName.toLowerCase() + '.tb > .tb-c > *[data-index="' + this.getAttribute("data-index") + '"][data-key="' + this.getAttribute("data-key") + '"]')[0]) document.querySelectorAll(this.parentNode.tagName.toLowerCase() + '.tb > .tb-c > *[data-index="' + this.getAttribute("data-index") + '"][data-key="' + this.getAttribute("data-key") + '"]')[0].style.display = "block"
            }
        }

        /* Text Type JS (also Dynamic Text JS) */
        var txt = document.querySelectorAll("[data-kbd]"),
            // Text Baseline Counter
            txtBaselineCounter = [0],
            // Text Counter
            txtCounter = [0],
            // Text Character Length
            txtLength = [0],
            // Text Content
            txtHTML = [""],
            // Text txt Attributes
            txtHTMLTxt = [[""]]

        // This function must run after the succeeding setInterval() function
        setTimeout(function() {
            // Loop through every text
            for (i = 0; i < txt.length; i++) {
                // Store the text content
                txtHTML[i] = txt[i].innerHTML
                
                // Store the numerous alternative texts in "data-txt" (each value is separated by "_" characters)
                txtHTMLTxt[i] = [
                    // The first text
                    (txt[i].getAttribute("data-txt").slice(
                        0,
                        parseInt(txt[i].getAttribute("data-txt").indexOf("_")))
                    ).replace(/</g, "&lt;").replace(/>/g, "&gt;").toString(),

                    // The second text
                    (txt[i].getAttribute("data-txt").slice(
                        parseInt(txt[i].getAttribute("data-txt").indexOf("_") + 1),
                        (parseInt(txt[i].getAttribute("data-txt").lastIndexOf("_"))))
                    ),
                    
                    // The third text
                    (
                        (txt[i].getAttribute("data-txt").slice(parseInt(txt[i].getAttribute("data-txt").lastIndexOf("_") + 1), -1)).toString() +
                        (txt[i].getAttribute("data-txt").slice(-1)).toString()
                    ).replace(/</g, "&lt;").replace(/>/g, "&gt;").toString()
                ]
                
                // Store the text content character length
                txtLength[i] = txtHTML[i].length
                
                // Create a baseline interval for splicing the text
                txtBaselineCounter[i] = parseFloat(txt[i].getAttribute("data-interval") / txtLength[i])
                
                // Set a counter for each text
                txtCounter[i] = 0
            }
        }, 2)

        // Slice the text content in order
        function txtForwardSlice() {
            txt[i].innerHTML = txt[i].innerHTML.slice(1)
        }
        function txtReverseSlice() {
            txt[i].innerHTML = txt[i].innerHTML.slice(0, -1)
        }

        /* --- NOTE ---
                This function must run continuously (every millisecond)
                to match baselines and intervals in logic functions
        */
        setInterval(function() {
            // Loop through every text
            for (i = 0; i < txt.length; i++) {
                // Increment the baseline
                txtCounter[i] += 0.005
                
                // Stringify the text content
                txt[i].innerHTML = txt[i].innerHTML.replace(/</g, "&lt;").replace(/>/g, "&gt;").toString()
                
                // Splice the text by a character when the counter increments up to the baseline
                if (txtCounter[i] >= txtBaselineCounter[i]) {
                        // Make sure to reset the counter to replay the condition
                        txtCounter[i] = 0

                        // Slice the text
                        if (txt[i].getAttribute("data-kbd") == "rev" ||
                            txt[i].getAttribute("data-kbd") == "reverse")
                            txtReverseSlice()
                        else
                            txtForwardSlice()
                }

                // Run this when the first content is done slicing 
                if (txt[i].innerHTML == "" &&
                    !txt[i].hasAttribute("data-txt1-complete") &&
                    !txt[i].hasAttribute("data-txt2-complete") &&
                    !txt[i].hasAttribute("data-txt3-complete")) {
                        // Record the completion
                        txt[i].setAttribute("data-txt1-complete", "")
                
                        // Change the content
                        txt[i].innerHTML = txtHTMLTxt[i][0]
                
                        // Update the text length and baseline
                        txtLength[i] = txtHTMLTxt[i][0].length
                        txtBaselineCounter[i] = parseFloat(txt[i].getAttribute("data-interval") / txtLength[i])
                }

                // Run this when the second content is done slicing
                if (txt[i].innerHTML == "" &&
                    txt[i].hasAttribute("data-txt1-complete")) {
                        // Remove all left-over white-spaces
                        txt[i].innerHTML = txt[i].innerHTML.replace(/ /g, "")

                        // Record the completion
                        txt[i].removeAttribute("data-txt1-complete")
                        txt[i].setAttribute("data-txt2-complete", "")
                
                        // Change the content
                        txt[i].innerHTML = txtHTMLTxt[i][1]
                
                        // Update the text length
                        txtLength[i] = txtHTMLTxt[i][1].length
                        txtBaselineCounter[i] = parseFloat(txt[i].getAttribute("data-interval") / txtLength[i])
                }
                
                // Run this when the third content is done slicing
                if (txt[i].innerHTML == "" &&
                    txt[i].hasAttribute("data-txt2-complete")) {
                        // Remove all left-over white-spaces
                        txt[i].innerHTML = txt[i].innerHTML.replace(/ /g, "")

                        // Record the completion
                        txt[i].removeAttribute("data-txt2-complete")
                        txt[i].setAttribute("data-txt3-complete", "")
                
                        // Change the content
                        txt[i].innerHTML = txtHTMLTxt[i][2]
                
                        // Update the text length
                        txtLength[i] = txtHTMLTxt[i][2].length
                        txtBaselineCounter[i] = parseFloat(txt[i].getAttribute("data-interval") / txtLength[i])
                }

                // Run this when all content is done slicing successively
                if (txt[i].innerHTML == "" &&
                    txt[i].hasAttribute("data-txt3-complete")) {
                        // Remove all left-over white-spaces
                        txt[i].innerHTML = txt[i].innerHTML.replace(/ /g, "")

                        // Record the completion
                        txt[i].removeAttribute("data-txt3-complete")
        
                        // Change the content
                        txt[i].innerHTML = txtHTML[i]
            
                        // Update the text length
                        txtLength[i] = txtHTML[i].length
                        txtBaselineCounter[i] = parseFloat(txt[i].getAttribute("data-interval") / txtLength[i])
                }
            }
        }, 1)
        
        // ToolTip (or ScreenTip) JS
        var tooltip = document.createElement("div"),
            // Elements with "data-title" attribute present
            tooltipElements = document.querySelectorAll("[data-title]")

            // Place the tooltip in the document
            body.appendChild(tooltip)
            
            // Identify and mark the tooltip
            tooltip.insertAdjacentHTML("beforebegin", "<!-- Tooltip -->")
            tooltip.setAttribute("id", "tooltip")

            // Hide the tooltip on received input
            body.addEventListener("click", hideTooltip)
            body.addEventListener("keydown", hideTooltip)
            body.addEventListener("keypress", hideTooltip)
            body.addEventListener("mousedown", hideTooltip)

            function hideTooltip() {
                setTimeout(function() {
                    tooltip.style.display = "none"
                }, 500)
            }
            
            // Mark all elements with the tooltip element
            for (i = 0; i < tooltipElements.length; i++) {
                // Show the tooltip and position it
                tooltipElements[i].onmouseover = function() {
                    tooltip.innerHTML = this.getAttribute("data-title")

                    tooltip.style.display = "inline"
                    tooltip.style.opacity = "1"

                    tooltip.style.transform = "translate(" +
                        (event.clientX + 10) + "px, " +
                        (event.clientY + 10) + "px" +
                    ")"

                // If the tooltip is positioned past the page borders
                if ((event.clientX + tooltip.clientWidth) >= body.clientWidth)
                    tooltip.style.transform = "translate(" +
                        ((event.clientX - tooltip.clientWidth) + 10) + "px, " +
                        (event.clientY + 10) + "px" +
                    ")"

                // Remove any disturbances to the tooltip
                    // Required Elements
                    if (this.hasAttribute("required") ||
                        this.required) {
                        this.removeAttribute("required")
                        this.setAttribute("title", "")

                        this.tooltipBefore = this.getAttribute("title")
                            if (!this.tooltipBefore || this.tooltipBefore == "")
                                this.tooltipBefore == false

                        this.onceRequired = true
                    }

                    /* Titled Elements
                            Two tooltips are not flexible on a
                            single element.
                    */
                    if (this.hasAttribute("title"))
                        this.removeAttribute("title")

                // Hide the tooltip regardless
                    if (this.getAttribute("data-title").lastIndexOf("_hidden") >= 0)
                        tooltip.style.opacity = "0"
                }

                // Hide the tooltip
                tooltipElements[i].onmouseleave = function() {
                    tooltip.style.opacity = "0"

                    // Correct any alterations made from corrections
                        // Required Elements
                        if (this.onceRequired) {
                            this.setAttribute("required", "")
                            
                            if (this.tooltipBefore)
                                this.setAttribute("title", this.tooltipBefore)
                            
                            this.onceRequired = false
                        }
                }
            }

        // Typing JS
        var typing = false

            // When input is received, set "typing" status to true
            // Add the events
            body.onkeydown = function() {
                typing = true
            }
            body.onkeypress = function() {
                typing = true
            }

            // Within a short time, set typing to false
            setInterval(function() {
                typing = false
            }, 650)
    }, 100)

    /* Lapys JS Class Sets
                --- NOTE ---
                    The script is repeated over in-case
                    of any event that causes a
                    change in styles (such as resizing).
        */
        setInterval(function() {
            for (i = 0; i < all.length; i++) {
                // Height Preset
                    // h-device-height
                    if (get.class(all[i]).value.indexOf("h-device-height") >= 0)
                        all[i].style.height = device.height + "px"
                    // h-width
                    if (get.class(all[i]).value.indexOf("h-width") >= 0)
                        all[i].style.height = all[i].clientWidth + "px"
                // Margin Preset
                    // m-parent-center
                    if (get.class(all[i]).value.indexOf("m-parent-center") >= 0)
                        all[i].style.margin = (
                            // Vertical Margin
                            (function() {
                                var verticalMargin = ((all[i].parentNode.clientHeight / 2) - (all[i].clientHeight / 2))

                                    if (verticalMargin == 0 ||
                                        !verticalMargin)
                                        return "auto "
                                    else
                                        return verticalMargin + "px "
                            })() + 
                            // Horizontal Margin
                            (function() {
                                var horizontalMargin = ((all[i].parentNode.clientWidth / 2) - (all[i].clientWidth / 2))

                                    if (horizontalMargin == 0 ||
                                        !horizontalMargin)
                                        return "auto"
                                    else
                                        return horizontalMargin + "px"
                            })()
                        )
                // Width Preset
                    // w-device-width
                    if (get.class(all[i]).value.indexOf("w-device-width") >= 0)
                        all[i].style.height = device.width + "px"
                // Width Preset
                    // w-device-width
                    if (get.class(all[i]).value.indexOf("w-device-width") >= 0)
                        all[i].style.width = device.width + "px"
                    // w-height
                    if (get.class(all[i]).value.indexOf("w-height") >= 0)
                        all[i].style.width = all[i].clientHeight + "px"
            }
        }, 1)

    /* All HTML Elements */
    for (i = 0; i < all.length; i++) {
        /* --- NOTE ---
                Add "description" property for describing elements.
                This is just to add more detail to an element.
        */
        all[i].description = ""

        // All elements excluding <html>
        if (all[i] != html) {
            // <lorem> for <input>
            if (all[i].tagName == "INPUT") {
                if (all[i].hasAttribute("value")) {
                    if (all[i].getAttribute("value").indexOf(":lorem1:") >= 0)
                        all[i].value = loremHTMLLevel1

                    if (all[i].getAttribute("value").indexOf(":lorem2:") >= 0)
                        all[i].value = loremHTMLLevel2

                    if (all[i].getAttribute("value").indexOf(":lorem3:") >= 0)
                        all[i].value = loremHTMLLevel3

                    if (all[i].getAttribute("value").indexOf(":lorem4:") >= 0)
                        all[i].value = loremHTMLLevel4

                    if (all[i].getAttribute("value").indexOf(":lorem5:") >= 0)
                        all[i].value = loremHTMLLevel5

                }
            }
            // <lorem> for <textarea>
            if (all[i].tagName == "TEXTAREA") {
                if (all[i].value.indexOf("<lorem 1>") >= 0)
                    all[i].value = all[i].value.replace("<lorem 1>", loremHTMLLevel1).slice(0, -10)

                if (all[i].value.indexOf("<lorem 2>") >= 0)
                    all[i].value = all[i].value.replace("<lorem 2>", loremHTMLLevel2).slice(0, -10)

                if (all[i].value.indexOf("<lorem 3>") >= 0)
                    all[i].value = all[i].value.replace("<lorem 3>", loremHTMLLevel3).slice(0, -10)

                if (all[i].value.indexOf("<lorem 4>") >= 0)
                    all[i].value = all[i].value.replace("<lorem 4>", loremHTMLLevel4).slice(0, -10)

                if (all[i].value.indexOf("<lorem 5>") >= 0)
                    all[i].value = all[i].value.replace("<lorem 5>", loremHTMLLevel5).slice(0, -10)

            }
            // Search for resize-able elements and reset their size when double-clicked
            if (!all[i].hasAttribute("data-resize")) {
                if (window.getComputedStyle(all[i]).getPropertyValue("resize") == "horizontal" ||
                    window.getComputedStyle(all[i]).getPropertyValue("resize") == "vertical" ||
                    window.getComputedStyle(all[i]).getPropertyValue("resize") == "both") {
                    
                    // Collect the initially set height and width of the resize-able element
                    var elementsResizeCSSHeight = [  ],
                        elementsResizeCSSWidth = [  ]

                    // Reset the object size
                    all[i].ondblclick = function() {
                        this.style.height = this.getAttribute("data-height")
                        this.style.width = this.getAttribute("data-width")
                    }
                    
                    // Get the collected size of each object
                    all[i].setAttribute("data-height", window.getComputedStyle(all[i]).getPropertyValue("height"))
                    all[i].setAttribute("data-width", window.getComputedStyle(all[i]).getPropertyValue("width"))
                }
            }
        }
    }

    /* Console */
    if (document.getElementsByTagName("html")[0].getAttribute("data-console") != "off") {
        // Brand LapysJS
        if (!LapysJS.executed && LapysJS.stylesheet != undefined)
            console.info("%c \tThank you for getting LapysJS\n\t\twe hope you enjoy the experience.", "font-family: Calibri Light")
        else
            console.warn("%c Please link (not import) the LapysJS stylesheet for complete usage of LapysJS.", "font-family: 'Calibri Light'")

        // Console Warnings
        for (i = 0; i < all.length; i++) {
            // Deprecated elements
            if (all[i].tagName == "ACRONYM" || all[i].tagName == "APPLET" ||
                all[i].tagName == "BASEFONT" ||
                all[i].tagName == "CONTENT" ||
                all[i].tagName == "DIR" ||
                all[i].tagName == "EMBED" ||
                all[i].tagName == "FONT" ||
                all[i].tagName == "ISINDEX" ||
                all[i].tagName == "KEYGEN" ||
                all[i].tagName == "LISTING" ||
                all[i].tagName == "MARQUEE" || all[i].tagName == "MENU" ||
                all[i].tagName == "NOBR" ||
                all[i].tagName == "PLAINTEXT" ||
                all[i].tagName == "S" || all[i].tagName == "STRIKE" || all[i].tagName == "SPACER" ||
                all[i].tagName == "TT" ||
                all[i].tagName == "U" ||
                all[i].tagName == "XMP")
                console.warn("%c The <" + all[i].tagName.toLowerCase() +
                    "> element is obsolete. Although it may still work in some browsers, its use is discouraged since it could be removed at any time. Try to avoid using it.", "font-family: 'Calibri Light'")
            // Useful deprecated elements
            if (all[i].tagName == "BIG" || all[i].tagName == "CENTER")
                console.warn("%c The <" + all[i].tagName.toLowerCase() +
                    "> element is useful, but is still deprecated.", "font-family: 'Calibri Light'")
            // Multiple elements
            if (document.getElementsByTagName("body")[1] ||
                document.getElementsByTagName("head")[1] ||
                document.getElementsByTagName("html")[1] ||
                document.getElementsByTagName("main")[1])
                console.warn("%c It is advised to use only 1 <" + all[i].tagName.toLowerCase() +
                    "> element.", "font-family: 'Calibri Light'")
        }
        // Add a section for Lapys JS Dependencies
        setTimeout(function() {
            all[all.length - 1].insertAdjacentHTML("afterend", "<!-- Lapys JS Element Dependencies -->")
        }, 1)
    }

    /* Execution
        --- NOTE ---
            The LapysJS script must run only once.
    */
    LapysJS.executed = true
    })()

/* End Main Function */
} else {
    // Throw an error if the global 'window' object does not exist.
    throw new Error("LapysJS v" + LapysJS.version + " does not function without the global 'window' object.")
}