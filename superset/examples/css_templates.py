# Licensed to the Apache Software Foundation (ASF) under one
# or more contributor license agreements.  See the NOTICE file
# distributed with this work for additional information
# regarding copyright ownership.  The ASF licenses this file
# to you under the Apache License, Version 2.0 (the
# "License"); you may not use this file except in compliance
# with the License.  You may obtain a copy of the License at
#
#   http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing,
# software distributed under the License is distributed on an
# "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
# KIND, either express or implied.  See the License for the
# specific language governing permissions and limitations
# under the License.
import textwrap

from superset import db
from superset.models.core import CssTemplate


def load_css_templates() -> None:
    """Loads 2 css templates to demonstrate the feature"""
    print("Creating default CSS templates")

    obj = db.session.query(CssTemplate).filter_by(template_name="Flat").first()
    if not obj:
        obj = CssTemplate(template_name="Flat")
        db.session.add(obj)
    css = textwrap.dedent(
        """\
    .navbar {
        transition: opacity 0.5s ease;
        opacity: 0.05;
    }
    .navbar:hover {
        opacity: 1;
    }
    .chart-header .header{
        font-weight: @font-weight-normal;
        font-size: 12px;
    }
    /*
    var bnbColors = [
        //rausch    hackb      kazan      babu      lima        beach     tirol
        '#ff5a5f', '#7b0051', '#007A87', '#00d1c1', '#8ce071', '#ffb400', '#b4a76c',
        '#ff8083', '#cc0086', '#00a1b3', '#00ffeb', '#bbedab', '#ffd266', '#cbc29a',
        '#ff3339', '#ff1ab1', '#005c66', '#00b3a5', '#55d12e', '#b37e00', '#988b4e',
     ];
    */
    """
    )
    obj.css = css
    db.session.commit()

    obj = db.session.query(CssTemplate).filter_by(template_name="Courier Black").first()
    if not obj:
        obj = CssTemplate(template_name="Courier Black")
        db.session.add(obj)
    css = textwrap.dedent(
        """\
    h2 {
        color: white;
        font-size: 52px;
    }
    .navbar {
        box-shadow: none;
    }
    .navbar {
        transition: opacity 0.5s ease;
        opacity: 0.05;
    }
    .navbar:hover {
        opacity: 1;
    }
    .chart-header .header{
        font-weight: @font-weight-normal;
        font-size: 12px;
    }
    .nvd3 text {
        font-size: 12px;
        font-family: inherit;
    }
    body{
        background: #000;
        font-family: Courier, Monaco, monospace;;
    }
    /*
    var bnbColors = [
        //rausch    hackb      kazan      babu      lima        beach     tirol
        '#ff5a5f', '#7b0051', '#007A87', '#00d1c1', '#8ce071', '#ffb400', '#b4a76c',
        '#ff8083', '#cc0086', '#00a1b3', '#00ffeb', '#bbedab', '#ffd266', '#cbc29a',
        '#ff3339', '#ff1ab1', '#005c66', '#00b3a5', '#55d12e', '#b37e00', '#988b4e',
     ];
    */
    """
    )
    obj.css = css
    db.session.commit()

    # MES TV dashboard theme
    obj = db.session.query(CssTemplate).filter_by(template_name="TV Dashboards").first()
    if not obj:
        obj = CssTemplate(template_name="TV Dashboards")
        db.session.add(obj)
    css = textwrap.dedent(
        """\
    #import font type for the dashboard 
    @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300&display=swap');
    /* changing the font as globally as possible */
    #main-menu + div *{
        font-family: 'Roboto', sans-serif !important;
    }

    .dashboard-content-wrapper{
    
    }
    /* changing the main dash background */
    .dashboard-content{
        background-color: #191919;
    }

    /* changing the title bar background and text color */
    /* note that the title text looks goofy in edit mode */
    .header-with-actions {
    background-color: #191919;
    color: white;
    }

    .dashboard-header-container{
    border:1px solid #353B4D;
    }
    /* editable title input field*/
    .dashboard-header-container input{
    color:#000;
    }
    /* messing with the header tabs bar */
    /* this is a ridiculous selector... more classes or test attributes could help */
    .dashboard-header-container + div .dashboard-component.dashboard-component-tabs {
    background: #191919;
    }

    /* changing the filters bar background */
    div[data-test=filter-bar] > div {
    background: Gainsboro;
    }
    /* changing the dashboard content colors */
    .dashboard-content .grid-container{
    margin: 24px;
    }
    
    .grid-container .grid-row .dashboard-component{
    background: #1a85a0;
    }
    """
    )
    obj.css = css
    db.session.commit()
