using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace Domain.Constants
{
    public struct PageContentConstants
    {
        public static Guid Shipping = new Guid("00000000-0000-0000-0000-000000000001");
        public static Guid ContactUs = new Guid("00000000-0000-0000-0000-000000000002");
        public static Guid AboutUs = new Guid("00000000-0000-0000-0000-000000000003");

        private static string ContentShipping = "<p>The English Wikipedia was the first Wikipedia edition and has remained the largest." +
            " It has pioneered many ideas as conventions, policies or features which were later adopted by Wikipedia editions in some of the other languages." +
            " These ideas include \"featured articles\",<a href=\"https://en.wikipedia.org/wiki/English_Wikipedia#cite_note-7\">[7]</a> the neutral-point-of-view policy," +
            "<a href=\"https://en.wikipedia.org/wiki/English_Wikipedia#cite_note-8\">[8]</a> navigation templates,<a href=\"https://en.wikipedia.org/wiki/English_Wikipedia#cite_note-9\">[9]</a> " +
            " the sorting of short \"stub\" articles into sub-categories,<a href=\"https://en.wikipedia.org/wiki/English_Wikipedia#cite_note-10\">[10]</a> <a href=\"https://en.wikipedia.org/wiki/Dispute_resolution\">dispute resolution</a> " +
            " mechanisms such as mediation and arbitration,<a href=\"https://en.wikipedia.org/wiki/English_Wikipedia#cite_note-11\">[11]</a> and weekly collaborations.<a href=\"https://en.wikipedia.org/wiki/English_Wikipedia#cite_note-12\">[12]</a></p>" +
            " <p>The English Wikipedia has adopted features from Wikipedias in other languages. These features include verified revisions from the <a href=\"https://en.wikipedia.org/wiki/German_Wikipedia\">German Wikipedia</a> and town population-lookup templates from the " +
            " <a href=\"https://en.wikipedia.org/wiki/Dutch_Wikipedia\">Dutch Wikipedia</a>.</p><p>Although the English Wikipedia stores images and audio files, as well as text files, many of the images have been moved to <a href=\"https://en.wikipedia.org/wiki/Wikimedia_Commons\">" +
            "Wikimedia Commons</a> with the same name, as passed-through files. However, the English Wikipedia also has <a href=\"https://en.wikipedia.org/wiki/Fair-use\">fair-use</a> images and audio/video files (with copyright restrictions), most of which are not allowed on Commons.</p>" +
            "<p>Many of the most active participants in the <a href=\"https://en.wikipedia.org/wiki/Wikimedia_Foundation\">Wikimedia Foundation</a>, and the developers of the <a href=\"https://en.wikipedia.org/wiki/MediaWiki\">MediaWiki</a> software that powers Wikipedia, are English-speaking users.</p>";

        public static readonly Dictionary<Guid, PageContent> ListPageContents = new Dictionary<Guid, PageContent>() {
            { Shipping, new PageContent(){  Order = 1,
                                            Title = "Shipping",
                                            Description = ContentShipping,
                                            ShortDes  = "Free Shipping World Wide" } },
            { ContactUs, new PageContent(){ Order = 2,
                                            Title = "Contact Us",
                                            ShortDes = "Online Service For New Customer"}} ,
            { AboutUs, new PageContent() {  Order = 3 ,
                                            Title = "About Us",
                                            Description = ContentShipping,
                                            ShortDes = "New Online Special Festival Offer"}}
        };
    }
}
