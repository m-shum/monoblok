import { mount } from '@cypress/react';
import RefChecker from '../../../playground/react/components/ref-checker';
import Teaser from '../../../playground/react/components/teaser';
import Grid from '../../../playground/react/components/grid';
import Feature from '../../../playground/react/components/feature';
import Page from '../../../playground/react/components/page';
import Test from './Test';

describe('@storyblok/react', () => {
  beforeEach(() => {
    cy.spy(window.console, 'log').as('log');
    cy.spy(window.console, 'error').as('error');
    delete window.storyblokRegisterEvent;
    document.getElementById('storyblok-javascript-bridge')?.remove();
  });

  describe('getStoryblokApi', () => {
    it('should return an instance of the API if we use the API Plugin', () => {
      mount(<Test accessToken="OurklwV5XsDJTIE1NJaD2wtt" />);
      cy.get('[data-test="api"]').should('have.text', 'true');
    });

    it('shouldn\'t return an instance of the API if no access token is provided', () => {
      mount(<Test />);
      cy.get('[data-test="api"]').should('have.text', 'false');
    });

    it('should return an error message when no access token is provided', () => {
      mount(<Test />);
      cy.get('@error').should(
        'be.calledWithMatch',
        'You can\'t use getStoryblokApi',
      );
    });
  });

  describe('storyblokComponent', () => {
    it('should render the StoryblokComponent if the blok is passed', () => {
      const blok = {
        component: 'teaser',
        headline: 'Hello React',
        _editable: `<!--#storyblok#{ "id": 12345, "uid": "fc34-uad1"}-->`,
      };

      const components = {
        teaser: Teaser,
      };

      mount(
        <Test
          blok={blok}
          accessToken="OurklwV5XsDJTIE1NJaD2wtt"
          components={components}
        />,
      );

      cy.get('[data-test="teaser"]').should('exist');
      cy.get('[data-test=teaser]')
        .should('have.attr', 'data-blok-c')
        .and('equals', '{"id":12345,"uid":"fc34-uad1"}');

      cy.get('[data-test=teaser]')
        .should('have.attr', 'data-blok-uid')
        .and('equals', '12345-fc34-uad1');
    });

    it('should log an error if the blok is not loaded', () => {
      const components = {
        teaser: Teaser,
      };

      mount(
        <Test accessToken="OurklwV5XsDJTIE1NJaD2wtt" components={components} />,
      );

      cy.get('[data-test="teaser"]').should('not.exist');
      cy.get('@error').should('be.calledWithMatch', 'Please provide a \'blok\'');
    });

    it('should log an error if the component is not loaded', () => {
      const blok = {
        component: 'teaser',
        headline: 'Hello React',
        _editable: `<!--#storyblok#{ "id": 12345, "uid": "fc34-uad1"}-->`,
      };

      mount(<Test blok={blok} components={[]} />);

      cy.get('[data-test="teaser"]').should('not.exist');
      cy.get(':empty').should('have.length', 1);
      cy.get('@error').should(
        'be.calledWithMatch',
        'Component teaser doesn\'t exist.',
      );
    });

    it('should pass ref to a \'real\' component', () => {
      const blok = {
        component: 'RefChecker',
        _editable: `<!--#storyblok#{ "id": 12345, "uid": "fc34-uad1"}-->`,
      };

      const ref = cy.stub();

      mount(
        <Test
          ref={ref}
          accessToken="OurklwV5XsDJTIE1NJaD2wtt"
          blok={blok}
          components={{
            RefChecker,
          }}
        />,
      ).then(() => expect(ref).to.be.calledOnce);
    });
  });

  describe('fallbackComponent', () => {
    it('should render the default Fallback Component', () => {
      const blok = {
        component: 'teaser',
        headline: 'Hello React',
        _editable: `<!--#storyblok#{ "id": 12345, "uid": "fc34-uad1"}-->`,
      };

      mount(
        <Test blok={blok} components={[]} enableFallbackComponent={true} />,
      );

      cy.get('p').contains('Is it configured correctly').should('exist');
    });

    it('should render the custom Fallback Component', () => {
      const blok = {
        component: 'teaser',
        headline: 'Hello React',
        _editable: `<!--#storyblok#{ "id": 12345, "uid": "fc34-uad1"}-->`,
      };

      mount(
        <Test
          blok={blok}
          components={[]}
          enableFallbackComponent={true}
          customFallbackComponent={TestFallbackComponent}
        />,
      );

      cy.get('[data-test=custom-fallback]').should('exist');
    });
  });

  describe('useStoryblok', () => {
    it('should render the StoryblokComponent', () => {
      const components = {
        teaser: Teaser,
        grid: Grid,
        feature: Feature,
        page: Page,
      };

      mount(
        <TestUseStoryblok
          accessToken="OurklwV5XsDJTIE1NJaD2wtt"
          components={components}
        />,
      );

      cy.get('[data-test="page"]').should('exist');
      cy.get('[data-test="grid"]').should('exist');
      cy.get('[data-test="feature"]').should('have.length', 3);
    });

    it('should log an error if no using the apiPlugin', () => {
      mount(<TestUseStoryblok />);

      cy.get('@error').should(
        'be.calledWithMatch',
        'You can\'t use useStoryblok',
      );
    });
  });
});
