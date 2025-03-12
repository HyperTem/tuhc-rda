let store = null

module.exports = {
    title: "Rex Duodecim Angelus",
    summary: "Adds Rex Duodecim Angelus to the comic.",
    author: "Ariah, edited by HyperTem",
    modVersion: 2.1,

    description: `Adds the popular fan animation, Rex Duodecim Angelus, to the comic at a location chosen in the settings (two locations have been implemented).<br /><br />
    By default, the animation is added after page 3763, right before entering Doc Scratch's apartment. This is the location recommended by the original mod author.<br /><br />
	Also included is the option to add the animation after page 2589, right when the fight is briefly shown in the normal comic. As the original mod was never updated with more options, I took the liberty of doing so myself. This option loses out on some context (notably the appearance of the ancestors as well as some visual callbacks), but also places the animation where it canonically takes place in the comic. It is up to you which location you prefer.<br /><br />
    This fan animation was not in any way made by me. The animation itself contains credits for everyone who worked on it, even when viewed inside of the comic.<br /><br />
    By default, you can find a link to the original video on the flash page (I've used previously unused page 2399), however this can be disabled below.<br /><br />
    You can also find a link <a href="https://www.youtube.com/watch?v=-19Up0dLzNw">here</a>.<br /><br />
    Unfortunately, the way the the UHC supports mods currently doesn't allow me to utilize 'New Reader Mode' effectively, so new readers please refrain from viewing this flash from the homepage when it first unlocks. The page I use technically is no longer recognized as a spoiler much before you should watch the flash, but this consequently allows any of the locations in the settings to function properly in 'New Reader Mode'.<br /><br />
    If you have any suggestions for alternate places to put the flash, please create an 'issue' on the original Github repository, not this fork of it. I only used my pedestrian knowledge of coding to piece together a second option for where the flash is placed. I don't actually know how to implement anything more complicated than editing what was already here, so I won't be adding anything more than this. Sorry!<br /><br />
    <h1>Settings</h1>`,

    settings: {
        boolean: [{
            model: "link_to_video",
            label: "Link to Video",
            desc: "Show a link to the original YouTube video on the page."
        }],
        radio: [{
            model: "placement",
            label: "Placement",
            desc: "Choose where to put the animation.",
            options: [{
                value: { },
                label: "Only on the Home Page",
                desc: `Don't put the flash in the comic at all, but still add it to the home page as a link.`
            },{
                value: {
                    title: "[S] Ƀẽ paŦíent.",
                    content: "[<span style=\"color: white\">Ah, now wasn't that thrilling?<br /><br />Their power and coordination were quite impressive, I must say. A shame that would all fall apart in due time, but you're quite aware of that already. In any case,</span>]",
                    previous: '005663',
                    next: '005664',
                    prev_content: "[<span style=\"color: white\">You rang?<br /><br />That was a joke. Of course you didn't. I don't have a doorbell, remember?<br /><br />Haa haa, hee hee, hoo hoo.<br /><br />You're early, however. Just under 8 minutes, in fact.<br /><br />I knew you would be, of course. Fret not, however. A good host always knows how to keep his guest entertained. I have prepared something exhilarating to tide you over for a short while, a peek at an event a certain someone didn’t see fit to show you. I’m quite sure you were curious to see how our 12 intrepid trolls snatched victory from the claws of defeat in their stacked session, were you not? (I know you were, hee hee).<br /><br />I ask only for a bit of patience while I finish sorting my affairs, please do enjoy this in the meantime.</span>]"
                },
                label: "After Page 3763 (recommended)",
                desc: `Put the flash right before entering Doc Scratch's apartment.<br />
                This also adds some lines of dialogue for Doc Scratch on page 3763 and on the flash's page.<br />
                Credit to 'TheStrifeisRife' for this dialog.`
            },{
                value: {
                    title: "[S] As you were, then.",
					content: "",
                    previous: '004489',
                    next: '004490'
                },
                label: "After Page 2589",
                desc: `Put the flash at the point where Aradia explains the Trolls' fight with the Black King.<br />
				This way, the video serves as a proper climax for Act 5 Act 1. You'll miss out on some context for the flash, but in turn, other pages will call back to it later in the comic. This may make it feel like a more or less authentic part of the real comic, depending on your perspective.`
            }]
        }]
    },

    routes: {
        'assets://storyfiles/hs2/02399/02399.mp4': './rda.mp4',
    },

    computed(api) {
        store = api.store

        store.set("link_to_video", store.get("link_to_video", true))
        store.set("placement", store.get("placement", this.settings.radio[0].options[1].value))
    },

    edit(archive) {
        archive.tweaks.modHomeRowItems.unshift({
            href: "/mspa/004299",
            thumbsrc: "/archive/music/alterniabound/rex-duodecim-angelus.jpg",
            date: "",
            title: '[S] Rex Duodecim Angelus',
            description: `<p>The popular fan animation which depicts the Trolls' fight with the Black King in its entirety.<br />Don't watch before at least finishing Act 5 Act 1, if not later.</p>`
        })

        archive.music.flashes['004299'] = {
            "date": "2011-03-14T00:00:00.000Z",
            "tracks": [ "rex-duodecim-angelus", "killed-by-br8k-spider" ]
        }
        archive.mspa.story['004299'] = {
            "title": "[S] Rex Duodecim Angelus",
            "pageId": "004299",
            "timestamp": "1402629405",
            "flag": [ 
                "F"
            ],
            "media": [
                "/storyfiles/hs2/02399/02399.mp4"
            ],
            "content": "",
            "next": [ ],
            "previous": ""
        }
        if(store.get("link_to_video")) {
            archive.mspa.story['004299'].content = "<a href=\"https://www.youtube.com/watch?v=-19Up0dLzNw\">Original Video</a><br /><br /><br />"
        }
        if(store.get("placement")?.title) archive.mspa.story['004299'].title = store.get("placement")?.title
        if(store.get("placement")?.content) archive.mspa.story['004299'].content += store.get("placement")?.content

        if(store.get("placement")?.previous) {
            archive.mspa.story[store.get("placement")?.previous].next = ['004299']
            archive.mspa.story['004299'].previous = store.get("placement")?.previous
        }
        if(store.get("placement")?.next) {
            archive.mspa.story[store.get("placement")?.next].previous = '004299'
            archive.mspa.story['004299'].next = [store.get("placement")?.next]
        }
        
        if(store.get("placement")?.prev_content) {
            archive.mspa.story[store.get("placement")?.previous].content = store.get("placement")?.prev_content
        }
        if(store.get("placement")?.next_content) {
            archive.mspa.story[store.get("placement")?.next].content = store.get("placement")?.next_content
        }
    }
}