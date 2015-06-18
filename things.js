var PICTURE_FLOATER_ID = "picture_floater";


function set_mail_by_innerHTML( node_name ) {
	 var node = document.getElementById( node_name );
	 if (node) {
	 	 addr = ("g" + String.fromCharCode(64) + "gandrade" + String.fromCharCode(46) + "net");
		 pgp_info = "PGP: 0x602B2AD8 / B348 C976 CCE1 A02A 017E 4649 7A6E B621 602B 2AD";
		 node.innerHTML = "<a href=mailto:" + addr + ">" + addr + "</a><br>" + pgp_info;
	 }
}


function set_picture_popup( node_name ) {
	 var node = document.getElementById( node_name );
	 if (node) {
			node.innerHTML = "<strong>This is my face.</strong>";
	 }
}


function show_picture_floater() {
	 var node = document.getElementById( PICTURE_FLOATER_ID );
	 node.style.display = "block";
	 var content_node = document.getElementById( "content" );
	 content_node.style.opacity = 0.6;
}

function hide_picture_floater() {
	 var node = document.getElementById( PICTURE_FLOATER_ID );
	 node.style.display = "none";
	 var content_node = document.getElementById( "content" );
	 content_node.style.opacity = 1.0
}

function body_onload() {
	 set_mail_by_innerHTML( "mail_li" );
//	 set_picture_popup( "picture_li" );
}
