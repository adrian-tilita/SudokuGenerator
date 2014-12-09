sudoku = {
	generate: function() {
		/**
		 * Generate the main board - normal list
		 **/
		var board = new Array;
		for (var i = 0; i < 9; i++)
			for (var j = 0; j < 9; j++)
				board[i * 9 + j] = (i*3 + Math.floor(i/3) + j) % 9 + 1;

		// Write The Board unshuffled
		this.writeBoard( board );

		board = this.shuffle( board, 50 );

		this.writeBoard( board );
		

	},
	/**
	 * Suffle Board
	 **/
	shuffle: function( board, times )
	{

		var numbers = new Array();
		for( time = 0; time < times; time++ )
		{
			var from_number = Math.floor(Math.random() * 9) + 1;
			var to_number   = Math.floor(Math.random() * 9) + 1;

			// It is not necessary to change one number with the same number
			if(from_number == to_number)
			{
				times++;
				continue;
			}
			for( var i = 0; i < board.length; i++ )
			{
				if( board[i] == from_number )
					board[i] = to_number;
				else if(board[i] == to_number)
					board[i] = from_number;
			}
		}
		return board;
	
	},
	/**
	 * Write The board - Rudimentary
	 **/
	writeBoard: function( board )
	{
		for( i = 0; i < board.length; i++)
		{
			key = i+1;
			var el = '';
			if( key % 3 == 0 && key != 0)
			{
				el = board[i] + ' | ';
				if( key % 9 == 0 )
					el += '<br/>';
			} else {
				el = board[i] + ' ';
			}
			this.addToElement( el );
			if( key % 27 == 0)
				this.addToElement('------------------------<br/>');

			if( key == board.length )
				this.addToElement('<br/><br/>');
		}
	
	},
	/**
	 * Add string to Board
	 **/
	addToElement: function( el )
	{
		document.getElementById('content').innerHTML = document.getElementById('content').innerHTML + el;
	}
};
sudoku.generate();