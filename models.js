'use strict';

module.exports = function(app , mongoose)
{

	require('./schema/release')(app , mongoose);
	require('./schema/assets')(app , mongoose);
}
