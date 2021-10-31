import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import TipDialog from '../../components/OmsDialog/TipDialog';
import styles from './style';
import { ActionCreator } from 'redux';
import { TagInfo } from '../../store/interface';
import { useSnackbar } from 'notistack';

type tDP = {
  deleteTag: ActionCreator<any>;
  addTag: ActionCreator<any>;
  editTag: ActionCreator<any>;
};

type tOP = {};

type tSP = tOP & {
  tagList: TagInfo[]
};

type tProps = tSP & tDP;

interface Column {
  id: string;
  label: string;
  minWidth?: number;
}

const columns: Column[] = [
  { id: 'name', label: '分组名称', minWidth: 170 },
  {
    id: 'operation',
    label: '操作',
    minWidth: 170,
  },
];

export default function TagTable({ deleteTag, tagList }: tProps) {
  const classes = makeStyles(styles)();
  const { enqueueSnackbar } = useSnackbar();
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const [open, setOpen] = useState<boolean>(false);
  const [name, setName] = useState<string>('');

  const title: string = '确定要删除这个标签吗？';
  const text: string = '如果不想删除可以点击取消';
  const dltButtonClick = (name: string) => {
    setName(name);
    setOpen(true);
  };
  const closeDialog = () => {
    setOpen(false);
  };
  const toDelete = () => {
    deleteTag(name);
    enqueueSnackbar(`标签: ${name} 已被删除`, {
      autoHideDuration: 3000,
      variant: 'success',
    });
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper className={classes.rootTable}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label='sticky table'>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  align='center'
                  key={column.id}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {tagList && tagList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
              return (
                <TableRow hover role='checkbox' tabIndex={-1} key={row.name}>
                  <TableCell key={row.name} align='center'>
                    {row.name}
                  </TableCell>
                  <TableCell align='center'>
                    <Button
                      className={classes.deleteButton}
                      onClick={ () => dltButtonClick(row.name)}
                    >
                      删除
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component='div'
        count={tagList.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <TipDialog
        open={open}
        title={title}
        text={text}
        toClose={closeDialog}
        todo={toDelete}
      />
    </Paper>
  );
}