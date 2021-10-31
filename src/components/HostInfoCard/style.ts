import { Styles } from '@material-ui/styles';
import { Theme } from '@material-ui/core/styles';
const styles: Styles<any, {}> = (theme: Theme) => ({
  HostInfoCard: {
    width: '400px',
    minWidth: 275,
  },
  listItem: {
    padding: 0,
    paddingLeft: '40px',
  },
  listItemText: {
    width: '4%',
  },
  title: {
    height: '40px',
    lineHeight: '30px',
    fontSize: 14,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  button: {
    width: '40px',
    height: '20px',
  },
  Select: {
    width: '100%',
  },
});

export default styles;
