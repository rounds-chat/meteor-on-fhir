import React from 'react';

import { DefaultPrivacyPolicyCard } from '/imports/ui/components/PrivacyPolicyCard';
import { GlassCard, VerticalCanvas } from 'meteor/clinical:glass-ui';

import { TermsConditionsCard } from '../components/TermsConditionsCard';

export class TermsConditionsPage extends React.Component {
  constructor(props) {
    super(props);
  }

  render(){
    return(
      <div id="TermsConditionsPage">
        <VerticalCanvas>
          <GlassCard height='auto'>
            <TermsConditionsCard />            
          </GlassCard>
        </VerticalCanvas>
      </div>
    );
  }
}
export default TermsConditionsPage;