# TrackShelf

<img width="1919" height="938" alt="image" src="https://github.com/user-attachments/assets/4363864b-8cb4-4838-9dae-5290e51a2546" />


A nextjs app to manage all the books, movies, and tv shows you watch so that you never forget what about these experiences was special to you.

## Usage

Head to https://track.aamira.me/ and create an account by clicking sign up. You should be redirected to the dashboard, but if not, reload. Here, in the dashboard, you will see a combined view of both books and movies. Feel free to use the links in the sidebar to filter by type. Clicking the Add Book or Add Movie button will pop up with some basic information about the media. I highly recomend googling for a cover image, once you find an image you like, right click and click copy image link then paste it into the cover URL field in the model. Feel in all the other information. Don't worry about writing all your thoughts about the movie now, you can edit the notes later. Click add and voila, the show is now tracked.

## Self host

Clone the repo then copy the `.env.example` file to `.env` and fill in the values. Then, either push it to vercel or self host it by running `bun install`, `bun run build`, and finally `bun run start` and make that a background task.
