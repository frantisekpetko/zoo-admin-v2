import { Fragment } from 'react';
import ContentLoader from 'react-content-loader';
import styled from 'styled-components';

import { Grid } from '@mui/material';
import Content from './common/Content';

const ContentLoaderGrid = styled(Grid)`
  min-height: 25rem;
  max-height: 25rem !important;
  margin-right: 2rem;
  display: flex;
  flex-direction: row;
  padding: 10px;
  border: none !important;
  margin-top: -8rem !important;
`

const CardLoader = (props) => {
    const width = 600;
    const height = 750;
    console.log(props);
    return (
        <Fragment>
            <Content>
                {props.animals.length === 1 ? (
                    <ContentLoader
                        speed={3}
                        width={width}
                        height={height}
                        viewBox={`0 0 ${height} ${width}`}
                        backgroundColor="#6a6868"
                        foregroundColor="#ecebeb"
                        {...props}
                    >
                        <circle cx="31" cy="31" r="15" />
                        <rect x="58" y="18" rx="2" ry="2" width="140" height="10" />
                        <rect x="58" y="34" rx="2" ry="2" width="140" height="10" />
                        <rect x="0" y="60" rx="2" ry="2" width={width} height={height} />
                    </ContentLoader>
                ) : (
                    <Grid container spacing={10} style={{ paddingLeft: 100, paddingRight: 50 }}>
                        {props.animals.map((_, id) => (
                            <ContentLoaderGrid item xs={12} sm={6} lg={4} xl={3} key={id}>
                                <ContentLoader
                                    speed={3}
                                    width={width + 300}
                                    height={height - 300}
                                    viewBox={`0 0 ${height - 200} ${width - 150}`}
                                    backgroundColor="#6a6868"
                                    foregroundColor="#ecebeb"
                                    {...props}
                                >
                                    <circle cx="31" cy="31" r="15" />
                                    <rect x="58" y="18" rx="2" ry="2" width="140" height="10" />
                                    <rect x="58" y="34" rx="2" ry="2" width="140" height="10" />
                                    <rect x="0" y="60" rx="2" ry="2" width={width} height={height } />
                                </ContentLoader>
                            </ContentLoaderGrid>
                        ))}
                    </Grid>
                )}
            </Content>
        </Fragment>
    );
};

export default CardLoader;
