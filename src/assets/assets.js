import img1 from '../assets/images/products/1.png';
import img2 from '../assets/images/products/2.png';
import img3 from '../assets/images/products/3.png';
import img4 from '../assets/images/products/4.png';
import img5 from '../assets/images/products/5.png';
import img6 from '../assets/images/products/6.png';
import img7 from '../assets/images/products/7.png';
import img8 from '../assets/images/products/8.png';
import img9 from '../assets/images/products/9.png';
import img10 from '../assets/images/products/10.png';
import img11 from '../assets/images/products/11.png';
import img12 from '../assets/images/products/12.png';
import img13 from '../assets/images/products/13.png';
import img14 from '../assets/images/products/14.png';
import img15 from '../assets/images/products/15.png';
import img16 from '../assets/images/products/16.png';
import img17 from '../assets/images/products/17.png';
import img18 from '../assets/images/products/18.png';
import img19 from '../assets/images/products/19.png';
import img20 from '../assets/images/products/20.png';
import img21 from '../assets/images/products/21.png';
import img22 from '../assets/images/products/22.png';
import img23 from '../assets/images/products/23.png';
import img24 from '../assets/images/products/24.png';
import img25 from '../assets/images/products/25.png';
import img26 from '../assets/images/products/26.png';
import img27 from '../assets/images/products/27.png';
import img28 from '../assets/images/products/28.png';
import img29 from '../assets/images/products/29.png';
import img30 from '../assets/images/products/30.png';
import img31 from '../assets/images/products/31.png';
import img32 from '../assets/images/products/32.png';
import img33 from '../assets/images/products/33.png';
import img34 from '../assets/images/products/2shirt.png';
import img35 from '../assets/images/products/2srt.jpg';
import img36 from '../assets/images/products/4srt.jpg';
import img37 from '../assets/images/products/5srt.jpg';
import img38 from '../assets/images/products/6srt.jpg';
import img39 from '../assets/images/products/7srt.jpg';
import img40 from '../assets/images/products/8srt.jpg';
import img41 from '../assets/images/products/9srt.jpg';


export const assets = {
   img1,
   img2,
   img3,
   img4,
   img5,
   img6,
   img7,
   img8,
   img9,
   img10,
   img11,
   img12,
   img13,
   img14,
   img15,
   img16,
   img17,
   img18,
   img19,
   img20,
   img21,
   img22,
   img23,
   img24,
   img25,
   img26,
   img27,
   img28,
   img29,
   img30,
   img31,
   img32,
   img33,
   //  shirts
   shirt1: img34,
   shirt2: img35,
   shirt3: img36,
   shirt4: img37,
   shirt5: img38,
   shirt6: img39,
   shirt7: img40,
   shirt8: img41,

}

export const products = [
   {
      id: AA01,
      name: 'Product 1',
      price: 440.00,
      image: img1,
      description: 'This is a description of product 1.',
      category: 'Category 1',
      stock: 100,
      rating: 4.5,
      reviews: 10,
      discount: 0.1,
      brand: 'Brand 1',
      color: 'Red',
      size: [XS, S, M, L, XL],
      weight: '1kg',
      dimensions: '10x10x10cm',
      material: 'Cotton',
      warranty: '1 year',
      returnPolicy: '30 days',
      shipping: 'Free shipping',
      availability: 'In stock',
      sku: 'SKU12345',
      tags: ['tag1', 'tag2', 'tag3'],
      relatedProducts: [2, 3, 4],
   },
   {
      id: AA02,
      name: 'Product 2',
      price: 550.00,
      image: img2,
      description: 'This is a description of product 2.',
      category: 'Category 2',
      stock: 50,
      rating: 4.0,
      reviews: 5,
      discount: 0.15,
      brand: 'Brand 2',
      color: 'Blue',
      size: [S, M, L],
      weight: '1.5kg',
      dimensions: '15x15x15cm',
      material: 'Polyester',
      warranty: '6 months',
      returnPolicy: '14 days',
      shipping: 'Standard shipping',
      availability: 'Out of stock',
      sku: 'SKU67890',
      tags: ['tag4', 'tag5'],
      relatedProducts: [1, 3, 5],
   },
   {
      id: AA03,
      name: 'Product 3',
      price: 600.00,
      image: img3,
      description: 'This is a description of product 3.',
      category: 'Category 3',
      stock: 200,
      rating: 4.8,
      reviews: 20,
      discount: 0.2,
      brand: 'Brand 3',
      color: 'Green',
      size: [M, L, XL],
      weight: '2kg',
      dimensions: '20x20x20cm',
      material: 'Wool',
      warranty: '2 years',
      returnPolicy: '60 days',
      shipping: 'Express shipping',
      availability: 'In stock',
      sku: 'SKU54321',
      tags: ['tag6', 'tag7', 'tag8'],
      relatedProducts: [1, 2, 4],
   },
   {
      id: AA04,
      name: 'Product 4',
      price: 700.00,
      image: img4,
      description: 'This is a description of product 4.',
      category: 'Category 4',
      stock: 0,
      rating: 3.5,
      reviews: 2,
      discount: 0.05,
      brand: 'Brand 4',
      color: 'Yellow',
      size: [XS, S],
      weight: '500g',
      dimensions: '5x5x5cm',
      material: 'Silk',
      warranty: 'No warranty',
      returnPolicy: 'No returns',
      shipping: 'Free shipping',
      availability: 'Out of stock',
      sku: 'SKU98765',
      tags: ['tag9', 'tag10'],
      relatedProducts: [1, 2, 3],
   },
   {
      id: AA05,
      name: 'Product 5',
      price: 800.00,
      image: img5,
      description: 'This is a description of product 5.',
      category: 'Category 5',
      stock: 150,
      rating: 4.2,
      reviews: 15,
      discount: 0.12,
      brand: 'Brand 5',
      color: 'Black',
      size: [L, XL],
      weight: '1kg',
      dimensions: '10x10x10cm',
      material: 'Leather',
      warranty: '1 year',
      returnPolicy: '30 days',
      shipping: 'Free shipping',
      availability: 'In stock',
      sku: 'SKU13579',
      tags: ['tag11', 'tag12'],
      relatedProducts: [1, 2, 3],
   },
   {
      id: AA06,
      name: 'Product 6',
      price: 900.00,
      image: img6,
      description: 'This is a description of product 6.',
      category: 'Category 6',
      stock: 75,
      rating: 4.7,
      reviews: 8,
      discount: 0.18,
      brand: 'Brand 6',
      color: 'White',
      size: [S, M],
      weight: '1.5kg',
      dimensions: '15x15x15cm',
      material: 'Denim',
      warranty: '6 months',
      returnPolicy: '14 days',
      shipping: 'Standard shipping',
      availability: 'In stock',
      sku: 'SKU24680',
      tags: ['tag13', 'tag14'],
      relatedProducts: [1, 2, 3],
   },
   {
      id: AA07,
      name: 'Product 7',
      price: 1000.00,
      image: img7,
      description: 'This is a description of product 7.',
      category: 'Category 7',
      stock: 25,
      rating: 4.9,
      reviews: 30,
      discount: 0.25,
      brand: 'Brand 7',
      color: 'Pink',
      size: [M, L],
      weight: '2kg',
      dimensions: '20x20x20cm',
      material: 'Nylon',
      warranty: '2 years',
      returnPolicy: '60 days',
      shipping: 'Express shipping',
      availability: 'In stock',
      sku: 'SKU86420',
      tags: ['tag15', 'tag16'],
      relatedProducts: [1, 2, 3],
   },
   {
      id: AA08,
      name: 'Product 8',
      price: 1100.00,
      image: img8,
      description: 'This is a description of product 8.',
      category: 'Category 8',
      stock: 10,
      rating: 3.8,
      reviews: 12,
      discount: 0.08,
      brand: 'Brand 8',
      color: 'Purple',
      size: [XS, S],
      weight: '500g',
      dimensions: '5x5x5cm',
      material: 'Rayon',
      warranty: 'No warranty',
      returnPolicy: 'No returns',
      shipping: 'Free shipping',
      availability: 'Out of stock',
      sku: 'SKU75319',
      tags: ['tag17', 'tag18'],
      relatedProducts: [1, 2, 3],
   },
   {
      id: AA09,
      name: 'Product 9',
      price: 1200.00,
      image: img9,
      description: 'This is a description of product 9.',
      category: 'Category 9',
      stock: 5,
      rating: 4.1,
      reviews: 6,
      discount: 0.22,
      brand: 'Brand 9',
      color: 'Orange',
      size: [L, XL],
      weight: '1kg',
      dimensions: '10x10x10cm',
      material: 'Acrylic',
      warranty: '1 year',
      returnPolicy: '30 days',
      shipping: 'Free shipping',
      availability: 'In stock',
      sku: 'SKU15973',
      tags: ['tag19', 'tag20'],
      relatedProducts: [1, 2, 3],
   },
   {
      id: AA10,
      name: 'Product 10',
      price: 1300.00,
      image: img10,
      description: 'This is a description of product 10.',
      category: 'Category 10',
      stock: 0,
      rating: 4.6,
      reviews: 18,
      discount: 0.3,
      brand: 'Brand 10',
      color: 'Gray',
      size: [S, M],
      weight: '1.5kg',
      dimensions: '15x15x15cm',
      material: 'Linen',
      warranty: '6 months',
      returnPolicy: '14 days',
      shipping: 'Standard shipping',
      availability: 'Out of stock',
      sku: 'SKU24680',
      tags: ['tag21', 'tag22'],
      relatedProducts: [1, 2, 3],
   },
   {
      id: AA11,
      name: 'Product 11',
      price: 1400.00,
      image: img11,
      description: 'This is a description of product 11.',
      category: 'Category 11',
      stock: 20,
      rating: 4.3,
      reviews: 9,
      discount: 0.17,
      brand: 'Brand 11',
      color: 'Brown',
      size: [M, L],
      weight: '2kg',
      dimensions: '20x20x20cm',
      material: 'Spandex',
      warranty: '2 years',
      returnPolicy: '60 days',
      shipping: 'Express shipping',
      availability: 'In stock',
      sku: 'SKU75319',
      tags: ['tag23', 'tag24'],
      relatedProducts: [1, 2, 3],
   },
   {
      id: AA12,
      name: 'Product 12',
      price: 1500.00,
      image: img12,
      description: 'This is a description of product 12.',
      category: 'Category 12',
      stock: 30,
      rating: 4.0,
      reviews: 11,
      discount: 0.14,
      brand: 'Brand 12',
      color: 'Cyan',
      size: [XS, S],
      weight: '500g',
      dimensions: '5x5x5cm',
      material: 'Polyester',
      warranty: 'No warranty',
      returnPolicy: 'No returns',
      shipping: 'Free shipping',
      availability: 'In stock',
      sku: 'SKU86420',
      tags: ['tag25', 'tag26'],
      relatedProducts: [1, 2, 3],
   },
   {
      id: AA13,
      name: 'Product 13',
      price: 1600.00,
      image: img13,
      description: 'This is a description of product 13.',
      category: 'Category 13',
      stock: 40,
      rating: 4.4,
      reviews: 7,
      discount: 0.2,
      brand: 'Brand 13',
      color: 'Magenta',
      size: [L, XL],
      weight: '1kg',
      dimensions: '10x10x10cm',
      material: 'Cotton',
      warranty: '1 year',
      returnPolicy: '30 days',
      shipping: 'Free shipping',
      availability: 'In stock',
      sku: 'SKU13579',
      tags: ['tag27', 'tag28'],
      relatedProducts: [1, 2, 3],
   },
   {
      id: AA14,
      name: 'Product 14',
      price: 1700.00,
      image: img14,
      description: 'This is a description of product 14.',
      category: 'Category 14',
      stock: 60,
      rating: 4.9,
      reviews: 25,
      discount: 0.12,
      brand: 'Brand 14',
      color: 'Teal',
      size: [S, M],
      weight: '1.5kg',
      dimensions: '15x15x15cm',
      material: 'Wool',
      warranty: '6 months',
      returnPolicy: '14 days',
      shipping: 'Standard shipping',
      availability: 'In stock',
      sku: 'SKU24680',
      tags: ['tag29', 'tag30'],
   },
   {
      id: AA15,
      name: "Product 15",
      price: 1800.00,
      image: img15,
      description: "This is a description of product 15.",
      category: "Category 15",
      stock: 80,
      rating: 4.6,
      reviews: 19,
      discount: 0.22,
      brand: "Brand 15",
      color: "Olive",
      size: [M, L],
      weight: "2kg",
      dimensions: "20x20x20cm",
      material: 'Cotton',
      warranty: '1 year',
      returnPolicy: '30 days',
      shipping: 'Free shipping',
      availability: 'In stock',
      sku: 'SKU13579',
      tags: ['tag27', 'tag28'],
      relatedProducts: [1, 2, 3],
   },
   {
      id: AA16,
      name: "Product 16",
      price: 1900.00,
      image: img16,
      description: "This is a description of product 16.",
      category: "Category 16",
      stock: 90,
      rating: 4.3,
      reviews: 14,
      discount: 0.18,
      brand: "Brand 16",
      color: "Coral",
      size: [S, M],
      weight: "500g",
      dimensions: "5x5x5cm",
      material: 'Polyester',
      warranty: 'No warranty',
      returnPolicy: 'No returns',
      shipping: 'Free shipping',
      availability: 'In stock',
      sku: 'SKU86420',
      tags: ['tag25', 'tag26'],
      relatedProducts: [1, 2, 3],
   },
   {
      id: AA17,
      name: "Product 17",
      price: 2000.00,
      image: img17,
      description: "This is a description of product 17.",
      category: "Category 17",
      stock: 110,
      rating: 4.7,
      reviews: 21,
      discount: 0.14,
      brand: "Brand 17",
      color: "Lavender",
      size: [L, XL],
      weight: "1kg",
      dimensions: "10x10x10cm",
      material: 'Wool',
      warranty: '1 year',
      returnPolicy: '30 days',
      shipping: 'Free shipping',
      availability: 'In stock',
      sku: 'SKU13579',
      tags: ['tag27', 'tag28'],
      relatedProducts: [1, 2, 3],
   },
   {
      id: AA18,
      name: 'Product 18',
      price: 2100.00,
      image: img18,
      description: 'This is a description of product 18.',
      category: 'Category 18',
      stock: 120,
      rating: 4.8,
      reviews: 28,
      discount: 0.2,
      brand: 'Brand 18',
      color: 'Mint Green',
      size: [XS, S],
      weight: '1.5kg',
      dimensions: '15x15x15cm',
      material: 'Silk',
      warranty: '6 months',
      returnPolicy: '14 days',
      shipping: 'Standard shipping',
      availability: 'In stock',
      sku: 'SKU24680',
      tags: ['tag29', 'tag30'],
      relatedProducts: [1, 2, 3],
   },
   {
      id: AA19,
      name: 'Product 19',
      price: 2200.00,
      image: img19,
      description: 'This is a description of product 19.',
      category: 'Category 19',
      stock: 130,
      rating: 4.5,
      reviews: 16,
      discount: 0.1,
      brand: 'Brand 19',
      color: 'Sky Blue',
      size: [M, L],
      weight: '2kg',
      dimensions: '20x20x20cm',
      material: 'Denim',
      warranty: '2 years',
      returnPolicy: '60 days',
      shipping: 'Express shipping',
      availability: 'In stock',
      sku: 'SKU75319',
      tags: ['tag23', 'tag24'],
   },
   {
      id: AA20,
      name: 'Product 20',
      price: 2300.00,
      image: img20,
      description: 'This is a description of product 20.',
      category: 'Category 20',
      stock: 140,
      rating: 4.1,
      reviews: 13,
      discount: 0.12,
      brand: 'Brand 20',
      color: 'Peach',
      size: [S, M],
      weight: '500g',
      dimensions: '5x5x5cm',
      material: 'Rayon',
      warranty: 'No warranty',
      returnPolicy: 'No returns',
      shipping: 'Free shipping',
      availability: 'In stock',
      sku: 'SKU86420',
      tags: ['tag25', 'tag26'],
      relatedProducts: [1, 2, 3],
   },
   {
      id: AA21,
      name: 'Product 21',
      price: 2400.00,
      image: img21,
      description: 'This is a description of product 21.',
      category: 'Category 21',
      stock: 150,
      rating: 4.4,
      reviews: 17,
      discount: 0.18,
      brand: 'Brand 21',
      color: 'Turquoise',
      size: [L, XL],
      weight: '1kg',
      dimensions: '10x10x10cm',
      material: 'Acrylic',
      warranty: '1 year',
      returnPolicy: '30 days',
      shipping: 'Free shipping',
      availability: 'In stock',
      sku: 'SKU13579',
      tags: ['tag27', 'tag28'],
   },
   {
      id: AA22,
      name: 'Product 22',
      price: 2500.00,
      image: img22,
      description: 'This is a description of product 22.',
      category: 'Category 22',
      stock: 160,
      rating: 4.9,
      reviews: 29,
      discount: 0.14,
      brand: 'Brand 22',
      color: 'Salmon Pink',
      size: [XS, S],
      weight: '1.5kg',
      dimensions: '15x15x15cm',
      material: 'Spandex',
      warranty: '6 months',
      returnPolicy: '14 days',
      shipping: 'Standard shipping',
      availability: 'In stock',
      sku: 'SKU24680',
   },
   {
      id: AA23,
      name: "Product 23",
      price: 2600.00,
      image: img23,
      description: "This is a description of product 23.",
      category: "Category 23",
      stock: 170,
      rating: 4.3,
      reviews: 12,
      discount: 0.2,
      brand: "Brand 23",
      color: "Lavender",
      size: [M, L],
      weight: "2kg",
      dimensions: "20x20x20cm",
      material: "Cotton",
      warranty: "1 year",
      returnPolicy: "30 days",
      shipping: "Free shipping",
      availability: "In stock",
      sku: "SKU13579",
      tags: ["tag27", "tag28"],
      relatedProducts: [1, 2, 3],
   },
   {
      id: AA24,
      name: "Product 24",
      price: 2700.00,
      image: img24,
      description: "This is a description of product 24.",
      category: "Category 24",
      stock: 180,
      rating: 4.6,
      reviews: 15,
      discount: 0.18,
      brand: "Brand 24",
      color: "Coral",
      size: [S, M],
      weight: "500g",
      dimensions: "5x5x5cm",
      material: "Polyester",
      warranty: "No warranty",
      returnPolicy: "No returns",
      shipping: "Free shipping",
      availability: "In stock",
      sku: "SKU86420",
      tags: ["tag25", "tag26"],
      relatedProducts: [1, 2, 3],
   }
]
