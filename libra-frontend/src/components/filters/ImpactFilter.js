import React, { Component } from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { Grid } from '@material-ui/core';
import Container from '@material-ui/core/Container';

const highImpactArray = ["frameshift", "splice_acceptor", "splice_donor", "start_lost", "stop_gained", "stop_lost"];
const medImpactArray = ["inframe_deletion", "inframe_insertion", "missense", "protein_altering", "splice_region"];
const lowImpactArray = ["_3_prime_UTR", "_5_prime_UTR", "coding_sequence", "downstream_gene", "intergenic", "intron", "mature_miRNA", 
    "non_coding_transcript_exon", "regulatory_region", "stop_retained", "synonymous", "upstream_gene"];

class ImpactFilter extends Component {
    constructor(props) {
        super(props);

        this.state = {
            highImpactSelectedOptions: [],
            medImpactSelectedOptions: [],
            lowImpactSelectedOptions: [],
            high: false, 
            medium: false, 
            low: false, 
            frameshift: false,
            splice_acceptor: false,
            splice_donor: false,
            start_lost: false, 
            stop_gained: false,
            stop_lost: false,
            inframe_deletion: false,
            inframe_insertion: false,
            missense: false,
            protein_altering: false,
            splice_region: false,
            _3_prime_UTR: false,
            _5_prime_UTR: false,
            coding_sequence: false,
            downstream_gene: false,
            intergenic: false,
            intron: false,
            mature_miRNA: false,
            non_coding_transcript_exon: false,
            regulatory_region: false,
            stop_retained: false,
            synonymous: false,
            upstream_gene: false,
            summary: ""            
        };

        this.handleChange = this.handleChange.bind(this);
        this.updateSummary = this.updateSummary.bind(this);
    }

    

    handleChange(event) {
        var summaryString = this.updateSummary(event);
        if (event.target.name === "high" && !event.target.checked) {
            console.log("here");
            var i;
            for (i = 0; i < this.state.highImpactSelectedOptions.length; i++) {
                this.setState({...this.state, [this.state.highImpactSelectedOptions[i]]: false});
            }
            this.setState({highImpactSelectedOptions: [], high: false});
        } else if (event.target.name === "medium" && !event.target.checked) {
            var i;
            for (i = 0; i < this.state.medImpactSelectedOptions.length; i++) {
                this.setState({...this.state, [this.state.medImpactSelectedOptions[i]]: false});
            }
            this.setState({medImpactSelectedOptions: [], medium: false});
        } else if (event.target.name === "low" && !event.target.checked) {
            var i;
            for (i = 0; i < this.state.lowImpactSelectedOptions.length; i++) {
                this.setState({...this.state, [this.state.lowImpactSelectedOptions[i]]: false});
            }
            this.setState({lowImpactSelectedOptions: [], low: false});
        }
        else {
            if (event.target.checked) {                
                if (highImpactArray.includes(event.target.name)) {
                    //var temp =  this.state.highImpactSelectedOptions;
                    //temp = temp.push[event.target.name];
                    //console.log("temp is " + this.state.highImpactSelectedOptions)
                    var temp = [...this.state.highImpactSelectedOptions, event.target.name];
                    this.setState({highImpactSelectedOptions: temp});
                } 

                if (medImpactArray.includes(event.target.name)) {
                    //var temp =  this.state.medImpactSelectedOptions;
                    //temp = temp.push[event.target.name];
                    this.setState({medImpactSelectedOptions: ["kill me"]});
                }

                if (lowImpactArray.includes(event.target.name)) {
                    //var temp =  this.state.lowImpactSelectedOptions;
                    //temp = temp.push[event.target.name];
                    this.setState({lowImpactSelectedOptions: [...this.state.lowImpactSelectedOptions, event.target.name]});
                }
            } /*else {
                if (highImpactArray.includes(event.target.name)) {
                    var temp = [...this.state.highImpactSelectedOptions];
                    temp = temp.filter(e => e !== event.target.name);
                    console.log("temp is " + temp);
                    this.setState({highImpactSelectedOptions: temp});
                } 

                if (medImpactArray.includes(event.target.name)) {
                    var temp = [...this.state.medImpactSelectedOptions];
                    temp = temp.filter(e => e !== event.target.name);
                    this.setState({medImpactSelectedOptions: temp});
                }

                if (lowImpactArray.includes(event.target.name)) {
                    var temp = [...this.state.lowImpactSelectedOptions];
                    temp = temp.filter(e => e !== event.target.name);
                    this.setState({lowImpactSelectedOptions: temp});                    
                }
            }*/

            this.setState({...this.state, [event.target.name]: event.target.checked});
        }
        
        console.log("lowImpactSelectedOptions " + this.state.lowImpactSelectedOptions + " medImpactSelectedOptions " + this.state.medImpactSelectedOptions + "  highImpactSelectedOptions " + this.state.highImpactSelectedOptions);
        this.props.handleFilterChange(summaryString);
    }

    updateSummary(event) {
        var summaryString = "";
        if (this.state.high && event.target.name !== "high") {
            summaryString = summaryString + "high ";
        }  
        if (this.state.medium && event.target.name !== "medium") {
            summaryString = summaryString + "medium ";
        }  
        if (this.state.low && event.target.name !== "low") {
            summaryString = summaryString + "low ";
        }  
        if (event.target.checked) {
            summaryString = summaryString + event.target.name;
        }  

        return summaryString;
    }

    render() {
        return(
            <div>
                <FormControl component="fieldset" >
                    <FormGroup>
                        <FormControlLabel
                            control={<Checkbox name="high" />}
                            checked={this.state.high}
                            onChange={this.handleChange}
                            label="HIGH"
                        />
                        <Container >
                            <FormGroup>
                                <FormControlLabel
                                    control={<Checkbox name="frameshift" />}
                                    checked={this.state.high || this.state.frameshift}
                                    onChange={this.handleChange}
                                    label="frameshift"
                                />
                                <FormControlLabel
                                    control={<Checkbox name="splice_acceptor" />}
                                    checked={this.state.high || this.state.splice_acceptor}
                                    onChange={this.handleChange}
                                    label="splice acceptor"
                                />
                                <FormControlLabel
                                    control={<Checkbox name="splice_donor" />}
                                    checked={this.state.high || this.state.splice_donor}
                                    onChange={this.handleChange}
                                    label="splice donor"
                                />
                                <FormControlLabel
                                    control={<Checkbox name="start_lost" />}
                                    checked={this.state.high || this.state.start_lost}
                                    onChange={this.handleChange}
                                    label="start lost"
                                />
                                <FormControlLabel
                                    control={<Checkbox name="stop_gained" />}
                                    checked={this.state.high || this.state.stop_gained}
                                    onChange={this.handleChange}
                                    label="stop gained"
                                />
                                <FormControlLabel
                                    control={<Checkbox name="stop_lost" />}
                                    checked={this.state.high || this.state.stop_lost}
                                    onChange={this.handleChange}
                                    label="stop lost"
                                />
                            </FormGroup>
                        </Container>                        

                        <FormControlLabel
                            control={<Checkbox name="medium" />}
                            checked={this.state.medium}
                            onChange={this.handleChange}
                            label="MED"
                        />
                        <Container >
                            <FormGroup> 
                                <FormControlLabel
                                    control={<Checkbox name="inframe_deletion" />}
                                    checked={this.state.medium || this.state.inframe_deletion}
                                    onChange={this.handleChange}
                                    label="inframe deletion"
                                />
                                <FormControlLabel
                                    control={<Checkbox name="inframe_insertion" />}
                                    checked={this.state.medium || this.state.inframe_insertion}
                                    onChange={this.handleChange}
                                    label="inframe insertion"
                                />
                                <FormControlLabel
                                    control={<Checkbox name="missense" />}
                                    checked={this.state.medium || this.state.missense}
                                    onChange={this.handleChange}
                                    label="missense"
                                />
                                <FormControlLabel
                                    control={<Checkbox name="protein_altering" />}
                                    checked={this.state.medium || this.state.protein_altering}
                                    onChange={this.handleChange}
                                    label="protein altering"
                                />
                                <FormControlLabel
                                    control={<Checkbox name="splice_region" />}
                                    checked={this.state.medium || this.state.splice_region}
                                    onChange={this.handleChange}
                                    label="splice region"
                                />
                            </FormGroup>
                        </Container>                        

                        <FormControlLabel
                            control={<Checkbox name="low" />}
                            checked={this.state.low}
                            onChange={this.handleChange}
                            label="LOW"
                        />
                        <Container>
                            <FormGroup> 
                                <FormControlLabel
                                    control={<Checkbox name="_3_prime_UTR" />}
                                    checked={this.state.low || this.state._3_prime_UTR}
                                    onChange={this.handleChange}
                                    label="3 prime UTR"
                                />
                                <FormControlLabel
                                    control={<Checkbox name="_5_prime_UTR" />}
                                    checked={this.state.low || this.state._5_prime_UTR}
                                    onChange={this.handleChange}
                                    label="5 prime UTR"
                                />
                                <FormControlLabel
                                    control={<Checkbox name="coding_sequence" />}
                                    checked={this.state.low || this.state.coding_sequence}
                                    onChange={this.handleChange}
                                    label="coding sequence"
                                />
                                <FormControlLabel
                                    control={<Checkbox name="downstream_gene" />}
                                    checked={this.state.low || this.state.downstream_gene}
                                    onChange={this.handleChange}
                                    label="downstream gene"
                                />
                                <FormControlLabel
                                    control={<Checkbox name="intergenic" />}
                                    checked={this.state.low || this.state.intergenic}
                                    onChange={this.handleChange}
                                    label="intergenic"
                                />
                                <FormControlLabel
                                    control={<Checkbox name="intron" />}
                                    checked={this.state.low || this.state.intron}
                                    onChange={this.handleChange}
                                    label="intron"
                                />
                                <FormControlLabel
                                    control={<Checkbox name="mature_miRNA" />}
                                    checked={this.state.low || this.state.mature_miRNA}
                                    onChange={this.handleChange}
                                    label="mature miRNA"
                                />
                                <FormControlLabel
                                    control={<Checkbox name="non_coding_transcript_exon" />}
                                    checked={this.state.low || this.state.non_coding_transcript_exon}
                                    onChange={this.handleChange}
                                    label="non coding transcript exon"
                                />
                                <FormControlLabel
                                    control={<Checkbox name="regulatory_region" />}
                                    checked={this.state.low || this.state.regulatory_region}
                                    onChange={this.handleChange}
                                    label="regulatory region"
                                />
                                <FormControlLabel
                                    control={<Checkbox name="stop_retained" />}
                                    checked={this.state.low || this.state.stop_retained}
                                    onChange={this.handleChange}
                                    label="stop retained"
                                />
                                <FormControlLabel
                                    control={<Checkbox name="synonymous" />}
                                    checked={this.state.low || this.state.synonymous}
                                    onChange={this.handleChange}
                                    label="synonymous"
                                />
                                <FormControlLabel
                                    control={<Checkbox name="upstream_gene" />}
                                    checked={this.state.low || this.state.upstream_gene}
                                    onChange={this.handleChange}
                                    label="upstream gene"
                                />
                            </FormGroup>
                        </Container>                        
                    </FormGroup>
                </FormControl>
            </div>            
        );
    }
}


export default ImpactFilter;