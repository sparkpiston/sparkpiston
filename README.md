# Spark Piston — GitHub Pages edition

This version publishes only the customer website. There is no public admin page. GitHub is the private editing area because only repository owners and approved collaborators can save changes.

## First-time publishing

1. Sign in at https://github.com.
2. Select **New repository**.
3. Name it `spark-piston` and select **Public**.
4. Select **Create repository**.
5. Select **Add file → Upload files**.
6. Drag the `docs` folder and `README.md` from this download into the upload area.
7. Select **Commit changes**.
8. Open the repository's **Settings**.
9. Select **Pages** in the left menu.
10. Under **Build and deployment → Source**, select **Deploy from a branch**.
11. Select the `main` branch and the `/docs` folder, then select **Save**.
12. Wait about two minutes and refresh the Pages settings screen to see the public website address.

The normal address will be:

`https://YOUR-GITHUB-USERNAME.github.io/spark-piston/`

## Change a product

1. In the repository, open `docs/data/products.json`.
2. Select the pencil icon (**Edit this file**).
3. Change the product information.
4. Select **Commit changes** twice.
5. Wait about one or two minutes for GitHub Pages to publish the update.

Use a number for the price:

```json
"price": 12999
```

Use `null` to show “Ask for price”:

```json
"price": null
```

Hide a product without deleting it:

```json
"available": false
```

Show it again:

```json
"available": true
```

## Add a new product

1. Open `docs/assets/products` in GitHub.
2. Select **Add file → Upload files** and upload the product photo.
3. Commit the image.
4. Open `docs/data/products.json` and select the pencil icon.
5. Copy an existing product block, paste it before the final `]`, and put a comma between product blocks.
6. Change the `id`, name, price, category, description, compatibility and image filename.
7. Commit the change.

Example:

```json
{
  "id": "unique-product-name",
  "name": "Product Name",
  "brand": "Product Brand",
  "price": 12999,
  "category": "Braking",
  "description": "Product description.",
  "compatibility": "Bike model and year",
  "image": "./assets/products/your-photo.jpg",
  "available": true
}
```

## Change the WhatsApp number

Open `docs/app.js`, edit this value, and commit the change:

```js
const WHATSAPP_NUMBER = "916381759789";
```

Use the country code and number without `+`, spaces or hyphens.

## Security

- The published website contains no admin route.
- Only people with write access to the GitHub repository can update products.
- Enable two-factor authentication on your GitHub account.
- Never put passwords, payment secrets or private customer information in this repository.
