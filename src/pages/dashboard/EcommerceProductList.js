import { sentenceCase } from 'change-case';
import { useState, useEffect } from 'react';
import {Link as RouterLink} from 'react-router-dom';
// @mui
import { useTheme } from '@mui/material/styles';
import {
  Box,
  Card,
  Table,
  TableRow,
  Checkbox,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination,
  Button
} from '@mui/material';
// redux
import { useDispatch, useSelector } from '../../redux/store';
import { getProductAll } from '../../redux/slices/ecommerce';
// utils
import { fDate } from '../../utils/formatTime';
import { fCurrency } from '../../utils/formatNumber';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// hooks
import useSettings from '../../hooks/useSettings';
// components
import Page from '../../components/Page';
import Label from '../../components/Label';
import Image from '../../components/Image';
import Scrollbar from '../../components/Scrollbar';
import SearchNotFound from '../../components/SearchNotFound';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
// sections
import {
  ProductMoreMenu,
  ProductListHead,
  ProductListToolbar,
} from '../../sections/@dashboard/e-commerce/product-list';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'name', label: 'Product', alignRight: false },
  { id: 'createdAt', label: 'Create at', alignRight: false },
  { id: 'inventoryType', label: 'Status', alignRight: false },
  { id: 'price', label: 'Price', alignRight: true },
  { id: '' },
];

// ----------------------------------------------------------------------

export default function EcommerceProductList() {
  const { themeStretch } = useSettings();
  const theme = useTheme();
  const dispatch = useDispatch();

  
  // const [productList, setProductList] = useState([]);
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [orderBy, setOrderBy] = useState('createdAt');
  
  useEffect(() => {
    dispatch(getProductAll());
  }, [dispatch]);
  
  const productList  = useSelector((state) => state?.product?.productAll);
  // useEffect(() => {
  //   if (products?.length) {
  //     setProductList(products);
  //   }
  // }, [products]);

  console.log('dfkjdfkj', productList);

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (checked) => {
    if (checked) {
      const selected = productList?.map((n) => n.name);
      setSelected(selected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
    }
    setSelected(newSelected);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterByName = (filterName) => {
    setFilterName(filterName);
  };

  const handleDeleteProduct = () => {
    // const deleteProduct = productList?.filter((product) => product.id !== productId);
    // setSelected([]);
    // setProductList(deleteProduct);
  };

  const handleDeleteProducts = () => {
    // const deleteProducts = productList?.filter((product) => !selected.includes(product.name));
    // setSelected([]);
    // setProductList(deleteProducts);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - productList?.length) : 0;

  const filteredProducts = applySortFilter(productList, getComparator(order, orderBy), filterName);

  const isNotFound = !filteredProducts?.length && Boolean(filterName);

  return (
    <Page title="Ecommerce: Product List">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Product List"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            {
              name: 'E-Commerce',
              href: PATH_DASHBOARD.eCommerce.root,
            },
            { name: 'Product List' },
          ]}
          action={
            <Button variant='contained' component={RouterLink} to={PATH_DASHBOARD.eCommerce.newProduct}>Product</Button>
          }
        />

        <Card>
          <ProductListToolbar
            numSelected={selected.length}
            filterName={filterName}
            onFilterName={handleFilterByName}
            onDeleteProducts={() => handleDeleteProducts(selected)}
          />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <ProductListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={productList?.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />

                <TableBody>
                  {filteredProducts?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                    const { id, productName, price, description, productCode, gender } = row;

                    const isItemSelected = selected.indexOf(id) !== -1;

                    return (
                      <TableRow
                        hover
                        key={id}
                        tabIndex={-1}
                        role="checkbox"
                        selected={isItemSelected}
                        aria-checked={isItemSelected}
                      >
                        <TableCell padding="checkbox">
                          <Checkbox checked={isItemSelected} onClick={() => handleClick(id)} />
                        </TableCell>
                        <TableCell sx={{ display: 'flex', alignItems: 'center' }}>
                          {/* <Image
                            disabledEffect
                            alt={productName}
                            // src={cover}
                            sx={{ borderRadius: 1.5, width: 64, height: 64, mr: 2 }}
                          /> */}
                          <Typography variant="subtitle2" noWrap>
                            {productName}
                          </Typography>
                        </TableCell>
                        <TableCell style={{ minWidth: 160 }}>{description}</TableCell>
                        <TableCell style={{ minWidth: 160 }}>{productCode}</TableCell>
                        <TableCell style={{ minWidth: 160 }}>{gender}</TableCell>
                        <TableCell style={{ minWidth: 160 }}>{price}</TableCell>
                        {/* <TableCell style={{ minWidth: 160 }}>
                          <Label
                            variant={theme.palette.mode === 'light' ? 'ghost' : 'filled'}
                            color={
                              (inventoryType === 'out_of_stock' && 'error') ||
                              (inventoryType === 'low_stock' && 'warning') ||
                              'success'
                            }
                          >
                            {inventoryType ? sentenceCase(inventoryType) : ''}
                          </Label>
                        </TableCell>
                        <TableCell align="right">{fCurrency(price)}</TableCell> */}
                        <TableCell align="right">
                          <ProductMoreMenu productName={id} onDelete={() => handleDeleteProduct(id)} />
                        </TableCell>
                      </TableRow>
                    );
                  })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>

                {isNotFound && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={6}>
                        <Box sx={{ py: 3 }}>
                          <SearchNotFound searchQuery={filterName} />
                        </Box>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={productList?.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={(event, value) => setPage(value)}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>
    </Page>
  );
}

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array?.map((el, index) => [el, index]);
  stabilizedThis?.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  if (query) {
    return array?.filter((products) => products.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }

  return stabilizedThis?.map((el) => el[0]);
}
