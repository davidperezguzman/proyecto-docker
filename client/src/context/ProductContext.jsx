useEffect(() => {
  setIsLoading(true);

  productService.getProducts(page).then((response) => {
    console.log("API RESPONSE:", response.data); // 👈 para debug

    const data = response.data;

    // 👇 Detecta automáticamente dónde viene el array
    const productsArray = Array.isArray(data)
      ? data
      : Array.isArray(data.products)
      ? data.products
      : Array.isArray(data.data)
      ? data.data
      : [];

    setProducts(productsArray);
    setIsLoading(false);
  });
}, [page]);