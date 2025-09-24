export interface Book {
	id: string;
	title: string;
	author: string;
	coverUrl?: string;
	rating?: number;
	dateCompleted: string;
	notes: string;
	genres: string[];
}

export interface Movie {
	id: string;
	title: string;
	director: string;
	posterUrl?: string;
	rating?: number;
	dateWatched: string;
	notes: string;
	genres: string[];
	runtime?: number;
}

export const mockBooks: Book[] = [
	{
		id: "1",
		title: "The Midnight Library",
		author: "Matt Haig",
		coverUrl:
			"https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=300&h=450&fit=crop",
		rating: 4.5,
		dateCompleted: "2024-12-01",
		notes: "A beautiful exploration of life's infinite possibilities. The concept of the midnight library as a place between life and death was fascinating. Made me think about the choices we make and how they shape our lives. The ending was particularly moving.",
		genres: ["Fiction", "Philosophy", "Contemporary"],
	},
	{
		id: "2",
		title: "Atomic Habits",
		author: "James Clear",
		coverUrl:
			"https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=450&fit=crop",
		rating: 5,
		dateCompleted: "2024-11-15",
		notes: "Incredibly practical book about building good habits and breaking bad ones. The 1% better every day concept really resonated with me. Started implementing the habit stacking technique and it's working well. Great actionable advice throughout.",
		genres: ["Self-Help", "Psychology", "Productivity"],
	},
	{
		id: "3",
		title: "Dune",
		author: "Frank Herbert",
		coverUrl:
			"https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=450&fit=crop",
		rating: 4,
		dateCompleted: "2024-10-22",
		notes: "Epic science fiction masterpiece. The world-building is incredible - the politics, ecology, and religion of Arrakis felt so real. Paul's journey was compelling but also tragic. The spice concept and its effects on consciousness were fascinating. Can't wait to read the sequels.",
		genres: ["Science Fiction", "Epic Fantasy", "Adventure"],
	},
	{
		id: "4",
		title: "The Seven Husbands of Evelyn Hugo",
		author: "Taylor Jenkins Reid",
		coverUrl:
			"https://images.unsplash.com/photo-1512820790803-83ca734da794?w=300&h=450&fit=crop",
		rating: 4.5,
		dateCompleted: "2024-09-30",
		notes: "What a captivating story! Evelyn Hugo is such a complex and fascinating character. The way the author revealed her secrets kept me on the edge of my seat. The LGBTQ+ representation was beautifully done, and the ending absolutely broke my heart.",
		genres: ["Historical Fiction", "Romance", "LGBTQ+"],
	},
	{
		id: "4",
		title: "Test Long Notes Book",
		author: "Test Author",
		coverUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=450&fit=crop",
		rating: 3,
		dateCompleted: "2024-12-01",
		notes: "This is a test book with extremely long notes that should demonstrate the text wrapping issue where verylongwordsthatdonthavespacesbetweenthemcancausethecontainertohorizontallyscrollorextendpasttheboundariesofthemodalcomponent. Here's a very long URL that might also cause issues: https://www.superlongdomainname.com/with/many/path/segments/that/could/potentially/break/the/layout/of/the/modal/component/when/displayed/in/the/notes/section/especially/if/word/wrapping/is/not/properly/configured/in/the/CSS/classes/applied/to/the/paragraph/element. And here's some normal text that should wrap fine within reasonable boundaries.",
		genres: ["Test", "Long Notes", "Wrapping"],
	},
];

export const mockMovies: Movie[] = [
	{
		id: "1",
		title: "Oppenheimer",
		director: "Christopher Nolan",
		posterUrl:
			"https://images.unsplash.com/photo-1489599512696-28532b48ae46?w=300&h=450&fit=crop",
		rating: 4.5,
		dateWatched: "2024-12-05",
		notes: "Nolan's masterful portrayal of the man behind the atomic bomb. Cillian Murphy's performance was absolutely incredible. The non-linear storytelling kept me engaged throughout. The moral complexity of Oppenheimer's legacy was handled brilliantly. Visually stunning.",
		genres: ["Biography", "Drama", "History"],
		runtime: 180,
	},
	{
		id: "2",
		title: "Spider-Man: Across the Spider-Verse",
		director: "Joaquim Dos Santos",
		posterUrl:
			"https://images.unsplash.com/photo-1635805737707-575885ab0820?w=300&h=450&fit=crop",
		rating: 5,
		dateWatched: "2024-11-20",
		notes: "Absolutely mind-blowing animation! Every frame is a work of art. The multiverse concept was executed perfectly, and Miles' character development was fantastic. The emotional core of the story really hit home. Can't wait for the next one!",
		genres: ["Animation", "Action", "Adventure"],
		runtime: 140,
	},
	{
		id: "3",
		title: "The Menu",
		director: "Mark Mylod",
		posterUrl:
			"https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=300&h=450&fit=crop",
		rating: 4,
		dateWatched: "2024-10-15",
		notes: "What a wild ride! Ralph Fiennes was terrifying as the chef. The satire of fine dining culture was spot on. Each 'course' ramped up the tension perfectly. Anya Taylor-Joy was excellent as always. Dark humor at its finest.",
		genres: ["Thriller", "Horror", "Dark Comedy"],
		runtime: 107,
	},
	{
		id: "4",
		title: "Everything Everywhere All at Once",
		director: "Daniels",
		posterUrl:
			"https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=300&h=450&fit=crop",
		rating: 5,
		dateWatched: "2024-09-12",
		notes: "This movie is pure genius! The multiverse concept was insane but somehow made perfect sense. Michelle Yeoh gave the performance of a lifetime. Made me laugh, cry, and question everything. The bagel metaphor was brilliant. Unforgettable experience.",
		genres: ["Sci-Fi", "Action", "Comedy"],
		runtime: 139,
	},
];
