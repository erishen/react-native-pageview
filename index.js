/**
 * 列表显示
 *
 */
'use strict';

var React = require('react-native');
var { View, Text, Image, ListView, LayoutAnimation, TouchableHighlight, PropTypes, StyleSheet, PixelRatio, Dimensions } = React;
var window = Dimensions.get('window');

var PageViewTemplate = React.createClass({

    propTypes: {
        data: PropTypes.array,
        sectionLength: PropTypes.number,
        contentContainerStyle: PropTypes.object,
        renderRow: PropTypes.func,
        onPressRow: PropTypes.func,
        renderSeparator: PropTypes.func,
        renderSectionHeader: PropTypes.func,
        scrollEnabled: PropTypes.bool
    },

    getDefaultProps() {
        return {
            data: [],
            sectionLength: 0,
            contentContainerStyle: null,
            renderRow: null,
            onPressRow: null,
            renderSeparator: null,
            renderSectionHeader: null,
            scrollEnabled: true
        }
    },

    getInitialState(){
        var getRowData = (dataBlob, sectionID, rowID) => {
            return dataBlob[sectionID + ':' + rowID];
        };

        var getSectionData = (dataBlob, sectionID) => {
            return dataBlob[sectionID];
        };

        return {
            dataSource: new ListView.DataSource({
                getRowData: getRowData,
                getSectionHeaderData: getSectionData,
                rowHasChanged: (row1, row2) => true,
                sectionHeaderHasChanged: (s1, s2) => true
            })
        }
    },

    // 获取外部参数的变化
    componentWillReceiveProps(nextProps) {
        this.reloadDataSource(nextProps.data, nextProps.sectionLength);
    },

    componentWillMount(){
        this.reloadDataSource(this.props.data, this.props.sectionLength);
        this.setState({ loaded: true });
    },

    listViewHandleData(data, sectionLength){

        var dataBlob = {};
        var sectionIDs = [];
        var rowIDs = [];

        var length = data.length;
        for(var i = 0; i < sectionLength; i++)
        {
            sectionIDs.push('s' + i);
            rowIDs.push([]);
        }

        if(sectionLength > 0 && length > 0) {
            var key, section;
            var index = 0;

            for (var i = 0; i < length; i++) {
                var obj = data[i];
                key = obj['id'];
                section = obj['section'];

                if (section === true) {
                    index += 1;
                    dataBlob['s' + index] = obj;
                } else {
                    dataBlob['s' + index + ':' + key] = obj;
                    rowIDs[index].push(key);
                }
            }

            // console.log(dataBlob, sectionIDs, rowIDs);
            return {
                dataBlob: dataBlob,
                sectionIDs: sectionIDs,
                rowIDs: rowIDs
            };
        }
        else
            return null;
    },

    reloadDataSource(data, sectionLength){

        var res = this.listViewHandleData(data, sectionLength);

        if(res != null) {
            this.setState({
                dataSource: this.state.dataSource.cloneWithRowsAndSections(res.dataBlob, res.sectionIDs, res.rowIDs)
            });

            LayoutAnimation.easeInEaseOut();
        }
    },
    defaultOnPressRow(rowData, sectionID, rowID){
        console.log('defaultOnPressRow', rowID);
    },
    defaultRenderRow(rowData, sectionID, rowID) {
        var image_content = (<View />);
        if(rowData.img != '')
            image_content = (
                <View style={styles.rowImgView}>
                    <Image style={styles.rowImg} source={{uri: rowData.img}} />
                </View>
            );

        var row_name = rowData.name;
        var content =  (
            <View style={styles.row}>
                <View style={styles.rowLine}>
                    {image_content}
                    <View style={styles.container}>
                        <Text style={styles.rowText}>{row_name}</Text>
                    </View>
                </View>
            </View>
        );

        var onPressRow = this.props.onPressRow || this.defaultOnPressRow;

        return (
            <TouchableHighlight onPress={() => onPressRow(rowData, sectionID, rowID)}>
                {content}
            </TouchableHighlight>
        );
    },
    defaultRenderSeparator(sectionID, rowID, adjacentRowHighlighted) {
        var style = styles.rowSeparatorRight;
        if (adjacentRowHighlighted) {
            style = [style, styles.rowSeparatorHide];
        }
        return (
            <View key={"SEC_" + sectionID + "_" + rowID} style={style} />
        );
    },
    defaultRenderSectionHeader(rowData, sectionID){
        if(rowData && rowData.section === true){
            return (
                <View style={[styles.rowSection]}>
                    <View style={styles.rowSectionLine}>
                        <View style={styles.rowLeft}>
                            <Text style={styles.rowMenu}>{rowData.name}</Text>
                        </View>
                        <View style={styles.rowRight}></View>
                    </View>
                </View>
            );
        } else {
            return (<View />);
        }
    },

    render(){
        console.log('render');

        var renderRow = this.props.renderRow || this.defaultRenderRow;
        var renderSeparator = this.props.renderSeparator || this.defaultRenderSeparator;
        var renderSectionHeader = this.props.renderSectionHeader || this.defaultRenderSectionHeader;

        if(this.props.data.length > 0 && this.props.sectionLength > 0) {
            return (
                <ListView
                    style={styles.listView}
                    dataSource={this.state.dataSource}
                    contentContainerStyle={this.props.contentContainerStyle}
                    renderRow={renderRow}
                    renderSeparator={renderSeparator}
                    renderSectionHeader={renderSectionHeader}
                    scrollEnabled={this.props.scrollEnabled} />
            );
        }
        else
        {
            return (
                <View style={styles.nodataView}>
                    <Text>{'No Data'}</Text>
                </View>
            );
        }
    }
});

var styles = StyleSheet.create({
   container: {
        flex: 1
    },
    nodataView: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20
    },
    rowImgView: {
        width: 47,
        height: 47,
        alignSelf: 'center',
        justifyContent: 'center'
    },
    rowImg: {
        width: 22,
        height: 17,
        alignSelf: 'center'
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF'
    },
    rowSection: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#e7e2dd'
    },
    rowLine: {
        flex: 1,
        height: 52,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    rowSectionLine: {
        flex: 1,
        height: 40,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    rowText: {
        fontSize: 17,
        color: '#4a4a4a'
    },
    rowMenu: {
        color: "#A29E99",
        fontSize: 14
    },
    rowLeft: {
        flex: 1,
        marginLeft: 10
    },
    rowRight: {
        marginRight: 10
    },
    rowSeparator: {
        flex: 1,
        backgroundColor: '#fff',
        height: 1 / PixelRatio.get(),
        marginLeft: 0,
        width: 80
    },
    rowSeparatorHide: {
        opacity: 0.0,
    },
    rowSeparatorRight: {
        marginLeft: 50,
        height: 1 / PixelRatio.get(),
        backgroundColor: '#E6E6E6'
    },
    listView: {
        width: window.width,
        marginTop: 25
    }
});

module.exports = PageViewTemplate;